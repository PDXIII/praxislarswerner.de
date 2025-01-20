

export type TeamMember = {
  contentTypeId: "teamMember",
  params: { slug: string },
  props:{
    slug: string,
    name: string,
    title: string,
    info: any,
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
    intro: object,
    text: object,
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
    text: object,
    info: object,
    image?: {
      url: string,
     description: string,
    },
  }
}


export type Config = {
  contentTypeId: "config",
  name: string,
  data: object,
}

export type LandingPage = {
  contentTypeId: "landingPage",
  params: { slug: string },
  props: {
    slug: string,
    name: string,
    introText: object,
    contactText: object,
  }
}