import { NotionAPI } from '@banr1/notion-client';

const { NOTION_ACCESS_TOKEN } = process.env;

const client = new NotionAPI({ authToken: NOTION_ACCESS_TOKEN });

export default client;
