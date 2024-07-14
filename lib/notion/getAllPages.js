import { idToUuid } from 'notion-utils';
import dayjs from 'dayjs';
import api from '@/lib/server/notion-api';
import getAllPageIds from './getAllPageIds';
import getPageProperties from './getPageProperties';
import filterPages from './filterPages';

export async function getAllPages({ allowedTypes, allowedStatuses }) {
  const id = idToUuid(process.env.NOTION_PAGE_ID);

  const response = await api.getPage(id);

  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id].value;

  // Check Type
  if (rawMetadata?.type !== 'collection_view_page' && rawMetadata?.type !== 'collection_view') {
    console.log(`pageId "${id}" is not a database`);
    return [];
  }

  // Construct Data
  const pageIds = getAllPageIds(collectionQuery);
  const data = [];
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i];
    const properties = (await getPageProperties(id, block, schema)) || null;

    // Add full width to properties
    properties.isFullWidth = block[id].value?.format?.page_full_width ?? false;
    // Convert date (with timezone) to unix milliseconds timestamp
    properties.date = (
      properties.date?.start_date ? dayjs.tz(properties.date?.start_date) : dayjs(block[id].value?.created_time)
    ).valueOf();

    data.push(properties);
  }

  // remove all the the items doesn't meet requirements
  const posts = filterPages({ pages: data, allowedTypes, allowedStatuses });

  // Sort by date
  posts.sort((a, b) => b.date - a.date);

  return posts;
}
