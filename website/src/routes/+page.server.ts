import { NOTION_DATABASE, NOTION_TOKEN } from "$env/static/private";
import { Client } from "@notionhq/client";
import { fail } from "@sveltejs/kit"

const allowedFieldTypes = new Set(["rich_text", "email", "date", "title", "phone_number"]);
const disallowedFieldNames = new Set(["Bearbeiter*in"]);

const internalServerErrorMessage = "Es ist ein Fehler aufgetreten."

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		if (data.get("consent") !== "on") {
			return fail(400, "Ohne Ihrer Einwilligung kann das Formular nicht abgeschickt werden.");
		}

		const notion = new Client(({ auth: NOTION_TOKEN }));
		const database = await notion.databases.retrieve({ database_id: NOTION_DATABASE });
		if (!("data_sources" in database)) {
			console.error("Database error");
			return fail(500, internalServerErrorMessage);
		};

		const dataSourceId = database.data_sources.filter(x => x.name === data.get("form")).map(x => x.id)[0];
		if (!dataSourceId) {
			console.error("Data source not found");
			return fail(500, internalServerErrorMessage);
		};

		const dataSource = await notion.dataSources.retrieve({ data_source_id: dataSourceId });
		if (!("properties" in dataSource)) {
			console.error("Data source error");
			return fail(500, internalServerErrorMessage);
		};

		const allowedFields = new Map(
			Object.entries(dataSource.properties)
			.filter(x => allowedFieldTypes.has(x[1].type) && !disallowedFieldNames.has(x[1].name))
			.map(x => [x[0], x[1].type])
		);

		const title = `${data.get("Vorname")} ${data.get("Nachname")}`;
		data.set("Name", title)
		data.set("Title", title)
		data.set("Datum", (new Date()).toISOString());

		const properties = new Map<string, any>(
			data.entries()
				.filter(x => allowedFields.has(x[0]))
				.map(x => [x[0], (() => {
					switch (allowedFields.get(x[0])) {
						case "email": return { email: x[1] };
						case "phone_number": return { phone_number: x[1] };
						case "date": return { date: { start: x[1] } };
						case "title": return { title: [{ text: { content: x[1] } }] }
						case "rich_text": return { rich_text: [{ text: { content: x[1] } }] };
						default: return null;
					}
				})()])
		);

		// @ts-ignore
		await notion.pages.create({ parent: { data_source_id: dataSource.id }, properties: Object.fromEntries(properties.entries()) }).catch(e => {
			console.error("API error");
			return fail(500, internalServerErrorMessage);
		});

		return { success: true };
	}
};