export function generateCalculatorSchema({
  title,
  description,
  url,
  ratingValue = 4.8,
  ratingCount = 120,
  reviewCount = 85,
}: {
  title: string
  description: string
  url: string
  ratingValue?: number
  ratingCount?: number
  reviewCount?: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      ratingCount: ratingCount,
      reviewCount: reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    url: url,
  }
}

export function generateBreadcrumbSchema(
  items: Array<{
    name: string
    item: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

export function generateArticleSchema({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
}: {
  title: string
  description: string
  url: string
  imageUrl: string
  datePublished: string
  dateModified: string
  authorName: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Calculator Suite",
      logo: {
        "@type": "ImageObject",
        url: "https://online-calculators.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }
}

export function generateFAQSchema(
  faqs: Array<{
    question: string
    answer: string
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateImageSchema({
  url,
  caption,
  width,
  height,
}: {
  url: string
  caption: string
  width: number
  height: number
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: url,
    caption: caption,
    width: width,
    height: height,
  }
}
