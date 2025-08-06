import { contentfulClient } from "../lib/contentful";
import type { EntryFieldTypes } from "contentful";
import type {
  TeamMember,
  Offer,
  Wisdom,
  Partner,
  Page,
  Config,
  LandingPage,
} from "../lib/types";
import { slug } from "github-slugger";

interface CFTeamMember {
  contentTypeId: "teamMember";
  fields: {
    name: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    order: EntryFieldTypes.Number;
    info: EntryFieldTypes.RichText;
    offer: EntryFieldTypes.Array<string>;
    image?: {
      fields: {
        description: EntryFieldTypes.Text;
        file: {
          url: EntryFieldTypes.Text;
        };
      };
    };
  };
}


interface CFOffer {
  contentTypeId: "offer";
  fields: {
    name: EntryFieldTypes.Text;
    intro: EntryFieldTypes.RichText;
    order: EntryFieldTypes.Number;
    text: EntryFieldTypes.RichText;
    image?: {
      fields: {
        file: {
          url: EntryFieldTypes.Text;
        };
      };
    };
    logoDachverband?: {
      fields: {
        file: {
          url: EntryFieldTypes.Text;
        };
      };
    };
    urlDachverband?: EntryFieldTypes.Text;
  };
}

interface CFWisdom {
  contentTypeId: "wisdom";
  fields: {
    author: EntryFieldTypes.Text;
    quote: EntryFieldTypes.Text;
  };
}

interface CFPartner {
  contentTypeId: "associates";
  fields: {
    name: EntryFieldTypes.Text;
    link: EntryFieldTypes.Text;
  };
}
interface CFConfig {
  contentTypeId: "config";
  fields: {
    name: EntryFieldTypes.Text;
    data: EntryFieldTypes.Object;
  };
}

interface CFPage {
  contentTypeId: "page";
  fields: {
    name: EntryFieldTypes.Text;
    text: EntryFieldTypes.Text;
    info: EntryFieldTypes.RichText;
    image?: {
      fields: {
        file: {
          url: EntryFieldTypes.Text;
        };
      };
    };
  };
}

interface CFConfig {
  contentTypeId: "config";
  fields: {
    name: EntryFieldTypes.Text;
    data: EntryFieldTypes.Object;
  };
}

interface CFLandingPage {
  contentTypeId: "landingPage";
  fields: {
    name: EntryFieldTypes.Text;
    introText: EntryFieldTypes.RichText;
    contactText: EntryFieldTypes.RichText;
  };
}

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const entries = await contentfulClient.getEntries<CFTeamMember>({
      content_type: "teamMember",
    });

    if (!entries?.items) {
      throw new Error("Contentful response enthält keine Team-Mitglieder.");
    }

    const members: TeamMember[] = entries.items.map((item) => {
      const { name, order, title, info, offer, image } = item.fields;

      if (!name || typeof order !== "number") {
        throw new Error(`Pflichtfelder fehlen bei Team-Mitglied mit ID: ${item.sys.id}`);
      }

      return {
        contentTypeId: item.sys.contentType.sys.id,
        params: { slug: slug(name) },
        props: {
          slug: slug(name),
          name,
          order,
          title,
          info,
          offer,
          image: image
            ? {
                url: image.fields?.file?.url ?? "",
                description: image.fields?.description ?? "",
              }
            : undefined,
        },
      };
    });

    return members.sort((a, b) => a.props.order - b.props.order);

  } catch (error) {
    console.error("Fehler beim Abrufen der Team-Mitglieder:", error);
    throw new Error("Team-Mitglieder konnten nicht geladen werden.");
  }
};


export const getWisdoms = async () => {
  const entries = await contentfulClient.getEntries<CFWisdom>({
    content_type: "wisdom",
  });
  const wisdoms = entries.items.map((item: CFWisdom) => {
    const wisdom = {
      contentTypeId: item.sys.contentType.sys.id,
      props: {
        author: item.fields.author,
        quote: item.fields.quote,
      },
    }
    return wisdom;
  })
  return wisdoms;
};


export const getPartners = async () => {
  const entries = await contentfulClient.getEntries<CFPartner>({
    content_type: "associates",
  });
  const partners = entries.items.map((item: CFPartner) => {
    const partner = {
      contentTypeId: item.sys.contentType.sys.id,
      props: {
        name: item.fields.name,
        link: item.fields.link,
      },
    }
    return partner;
  })
  return partners;
};

export const getOffers = async (): Promise<Offer[]> => {
  try {
    const entries = await contentfulClient.getEntries<CFOffer>({
      content_type: "offer",
    });

    if (!entries?.items) {
      throw new Error("Contentful response enthält keine items.");
    }

    const offers: Offer[] = entries.items.map((item) => {
      const { name, order, intro, text, image, logoDachverband, urlDachverband } = item.fields;

      if (!name || typeof order !== "number") {
        throw new Error(`Pflichtfelder fehlen bei Angebot mit ID: ${item.sys.id}`);
      }

      return {
        contentTypeId: item.sys.contentType.sys.id,
        params: { slug: slug(name) },
        props: {
          slug: slug(name),
          name,
          order,
          intro,
          text,
          image: image
            ? {
                url: image.fields?.file?.url ?? "",
                description: image.fields?.description ?? "",
              }
            : undefined,
          logo: logoDachverband
            ? {
                url: logoDachverband.fields?.file?.url ?? "",
                description: logoDachverband.fields?.description ?? "",
              }
            : undefined,
          link: urlDachverband
            ? { url: urlDachverband }
            : undefined,
        },
      };
    });

    return offers.sort((a, b) => a.props.order - b.props.order);

  } catch (error) {
    console.error("Fehler beim Abrufen der Angebote:", error);
    throw new Error("Angebote konnten nicht geladen werden.");
  }
};


export const getPages = async () => {
  const entries = await contentfulClient.getEntries<CFPage>({
    content_type: "page",
  });

  const pages: Page[] = entries.items.map((item: CFPage) => {
    const page: Page = {
      contentTypeId: item.sys.contentType.sys.id,
      params: { slug: slug(item.fields.name) },
      props: {
        slug: slug(item.fields.name),
        name: item.fields.name,
        text: item.fields.text,
        info: item.fields.info,
        image: item.fields.image
          ? {
              url: item.fields.image.fields.file.url,
              description: item.fields.image.fields.description,
            }
          : undefined,
      },
    };
    return page;
  });
  return pages;


};

export const getLandingPage = async () => {
  const page = await contentfulClient.getEntry<CFLandingPage>(
    "xln036ds3i7CCHBhvaMVA"
  );
  return page.fields;
};

export const getPageByID = async (id: string) => {
  const page = await contentfulClient.getEntry<CFPage>(id);
  return page.fields;
};

export const getConfigByID = async (id: string) => {
  const config = await contentfulClient.getEntry<CFConfig>(id);
  return config.fields;
};
