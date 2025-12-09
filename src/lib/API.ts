// src/lib/API.ts
import { contentfulClient } from "./contentful";
import { slug } from "github-slugger";
import type { EntryFieldTypes } from "contentful";
import type {
  TeamMember,
  Offer,
  Page,
  Partner,
  Config,
  Wisdom,
  LandingPage,
} from "./types";

// -------------------------
// Interfaces für Contentful
// -------------------------
interface CFTeamMember {
  contentTypeId: "teamMember";
  fields: {
    name: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    order: EntryFieldTypes.Number;
    bio: EntryFieldTypes.RichText;
    info: EntryFieldTypes.RichText;
    offer: EntryFieldTypes.Array<EntryFieldTypes.Text>; // ⚡ Text-Array
    image?: {
      fields: {
        description: EntryFieldTypes.Text;
        file: { url: EntryFieldTypes.Text };
      };
    };
  };
}

interface CFOffer {
  contentTypeId: "offer";
  fields: {
    name: EntryFieldTypes.Text;
    order: EntryFieldTypes.Number;
    info: EntryFieldTypes.RichText;
    text: EntryFieldTypes.RichText;
    image?: {
      fields: { url: EntryFieldTypes.Text; description?: EntryFieldTypes.Text };
    };
    logoDachverband?: {
      fields: { url: EntryFieldTypes.Text; description?: EntryFieldTypes.Text };
    };
    urlDachverband?: EntryFieldTypes.Text;
  };
}

interface CFPage {
  contentTypeId: "page";
  fields: {
    name: EntryFieldTypes.Text;
    text: EntryFieldTypes.RichText;
    intro: EntryFieldTypes.RichText;
    image?: {
      fields: { url: EntryFieldTypes.Text; description: EntryFieldTypes.Text };
    };
  };
}

interface CFPartner {
  contentTypeId: "associates";
  fields: { name: EntryFieldTypes.Text; link: EntryFieldTypes.Text };
}

interface CFConfig {
  contentTypeId: "config";
  fields: { name: EntryFieldTypes.Text; data: EntryFieldTypes.Object };
}

interface CFWisdom {
  contentTypeId: "wisdom";
  fields: { author: EntryFieldTypes.Text; quote: EntryFieldTypes.Text };
}

interface CFLandingPage {
  contentTypeId: "landingPage";
  fields: {
    name: EntryFieldTypes.Text;
    info: EntryFieldTypes.Text;
    introText: EntryFieldTypes.RichText;
    contactText: EntryFieldTypes.RichText;
    slideshowImages?: Array<{
      fields: { file: { url: EntryFieldTypes.Text } };
    }>;
  };
}

// -------------------------
// Cache für wiederholte Calls
// -------------------------
const cache = new Map<string, any>();
export async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (cache.has(key)) return cache.get(key);
  const result = await fn();
  cache.set(key, result);
  return result;
}

// -------------------------
// TeamMember
// -------------------------
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const entries = await contentfulClient.getEntries<CFTeamMember>({
    content_type: "teamMember",
  });
  return entries.items.map((item) => {
    const { name, title, order, bio, info, offer, image } = item.fields;
    return {
      contentTypeId: item.sys.contentType.sys.id,
      params: { slug: slug(name) },
      props: {
        name,
        order,
        title,
        bio,
        info,
        offer: offer.map((o) => String(o)), // ⚡ Array<Text> -> string[]
        image: image
          ? {
              url: image.fields.file.url,
              description: image.fields.description,
            }
          : undefined,
      },
    };
  });
};

// -------------------------
// Offers
// -------------------------
export const getOffers = async (): Promise<Offer[]> => {
  const entries = await contentfulClient.getEntries<CFOffer>({
    content_type: "offer",
  });
  return entries.items.map((item) => {
    const { name, order, info, text, image, logoDachverband, urlDachverband } =
      item.fields;
    return {
      contentTypeId: item.sys.contentType.sys.id,
      params: { slug: slug(name) },
      props: {
        name,
        order,
        info,
        text,
        image: image
          ? {
              url: image.fields.file.url,
              description: image.fields.file.description,
            }
          : undefined,
        logo: logoDachverband
          ? {
              url: logoDachverband.fields.url,
              description: logoDachverband.fields.description,
            }
          : undefined,
        link: urlDachverband ? { url: String(urlDachverband) } : undefined,
      },
    };
  });
};

// -------------------------
// Pages
// -------------------------

export const getJobOffer = async (id: string): Promise<Page> => {
  const entry = await contentfulClient.getEntry<CFPage>(id);
  const { name, text, info, image } = entry.fields;
  return {
    contentTypeId: entry.sys.contentType.sys.id,
    params: { slug: slug(name) },
    props: {
      name,
      text,
      info,
      image: image
        ? { url: image.fields.url, description: image.fields.description }
        : undefined,
    },
  };
};


export const getPages = async (): Promise<Page[]> => {
  const entries = await contentfulClient.getEntries<CFPage>({
    content_type: "page",
  });
  return entries.items.map((item) => {
    const { name, text, intro, image } = item.fields;
    return {
      contentTypeId: item.sys.contentType.sys.id,
      params: { slug: slug(name) },
      props: {
        name,
        text,
        intro,
        image: image
          ? { url: image.fields.file.url, description: image.fields.description }
          : undefined,
      },
    };
  });
};

// -------------------------
// Partner
// -------------------------
export const getPartners = async (): Promise<Partner[]> => {
  const entries = await contentfulClient.getEntries<CFPartner>({
    content_type: "associates",
  });
  return entries.items.map((item) => ({
    contentTypeId: item.sys.contentType.sys.id,
    props: { name: item.fields.name, link: item.fields.link },
  }));
};

// -------------------------
// Config
// -------------------------
export const getConfigByID = async (id: string): Promise<Config> => {
  const entry = await contentfulClient.getEntry<CFConfig>(id);
  return {
    contentTypeId: entry.sys.contentType.sys.id,
    name: entry.fields.name,
    data: entry.fields.data,
  };
};

// -------------------------
// Wisdoms
// -------------------------
export const getWisdoms = async (): Promise<Wisdom[]> => {
  const entries = await contentfulClient.getEntries<CFWisdom>({
    content_type: "wisdom",
  });
  return entries.items.map((item) => ({
    contentTypeId: item.sys.contentType.sys.id,
    props: { author: item.fields.author, quote: item.fields.quote },
  }));
};

// -------------------------
// LandingPage
// -------------------------
export const getLandingPage = async (): Promise<LandingPage> => {
  const entry = await contentfulClient.getEntry<CFLandingPage>("xln036ds3i7CCHBhvaMVA");
  return {
    contentTypeId: entry.sys.contentType.sys.id,
    params: { slug: "" },
    props: {
      name: entry.fields.name,
      info: entry.fields.info,
      introText: entry.fields.introText,
      contactText: entry.fields.contactText,
      // ✅ Slideshow-Bilder in der korrekten Struktur für Slideshow.astro
      slideshowImages: entry.fields.slideshowImages?.map((img) => ({
        fields: {
          file: {
            url: img.fields.file.url,
          },
          description: img.fields.description ?? "",
        },
      })) ?? [],
    },
  };
};

// -------------------------
// Single Page by ID
// -------------------------
export const getPageByID = async (id: string): Promise<Page | null> => {
  // console.log('Fetching page with ID:', id);
  
  try {
    // Holt Entries mit sys.id Filter - gibt leeres Array zurück wenn unpublished
    const result = await contentfulClient.getEntries<CFPage>({
      content_type: 'page', // Ersetze 'page' mit deinem Content Type
      'sys.id': id,
      limit: 1
    });
    
    // Prüft ob die Seite existiert und published ist
    if (result.items.length === 0) {
      console.log('Page not found or not published:', id);
      return null;
    }
    
    const entry = result.items[0];
    // console.log('Entry received:', entry);
    // console.log('Entry fields:', entry.fields);
    
    const { name, text, intro, image } = entry.fields;
    
    // console.log('Extracted fields:', { name, text, intro, image });
    
    return {
      contentTypeId: entry.sys.contentType.sys.id,
      params: { slug: slug(name) },
      sys: entry.sys,
      props: {
        name,
        text,
        intro,
        image: image
          ? { url: image.fields.url, description: image.fields.description }
          : undefined,
      },
    };
  } catch (error) {
    console.error('Error fetching page:', error);
    return null; // Gibt null zurück statt Error zu werfen
  }
};
