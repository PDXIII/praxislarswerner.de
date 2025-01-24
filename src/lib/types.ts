

export type TeamMember = {
  contentTypeId: "teamMember",
  params: { slug: string },
  props:{
    slug: string,
    name: string,
    title: string,
    info: any,
    offer: string[],
    image: {
      url: string,
      description: string
    },
  }
}

export type Offer = {
  contentTypeId: "offer",
  params: { slug: string },
  props: {
    slug: string,
    name: string,
    intro: any,
    text: any,
    image?: {
      url: string,
      description?: string
    }
    logo?: {
      url: string,
      description?: string,
    }
    link?: {
      url: string,
    }
  }
}


export type Page = {
  contentTypeId: "page",
  params: { slug: string} ,
  props: {
    slug: string,
    name: string,
    text: any,
    info: any,
    image?: {
      url: string,
     description: string,
    },
  }
}


export type Config = {
  contentTypeId: "config",
  name: string,
  data: any,
}

export type LandingPage = {
  contentTypeId: "landingPage",
  params: { slug: string },
  props: {
    slug: string,
    name: string,
    introText: any,
    contactText: any,
  }
}