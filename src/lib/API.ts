
import { contentfulClient } from "../lib/contentful";
import type { TeamMember, Offer, Page } from "../lib/types";
export const getTeamMembers = async () => {
  const entries = await contentfulClient.getEntries<TeamMember>({
    content_type: "teamMember",
  });
  return entries.items;
}
export const getOffers = async () => {
  const entries = await contentfulClient.getEntries<Offer>({
    content_type: "offer",
  });
  return entries.items;
}
export const getPages = async () => {
  const entries = await contentfulClient.getEntries<Page>({
    content_type: "page",
  });
  return entries.items;
}

