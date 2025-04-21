import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { generateArticleSchema } from "@/lib/schema"
import { LucideIcon } from "@/components/lucide-icon"
import { getAllCalculators } from "@/lib/site-config"

// This would normally come from a CMS or database
const blogPosts = [
  {
    slug: "how-to-use-mortgage-calculator",
    title: "How to Use a Mortgage Calculator",
    description: "Learn how to effectively use our mortgage calculator to make better financial decisions.",
    content: `
      <p>A mortgage calculator is a powerful tool that can help you understand the financial implications of your home purchase. By inputting a few key details, you can get a clear picture of your monthly payments, total interest costs, and more.</p>
      
      <h2>Why Use a Mortgage Calculator?</h2>
      <p>Before applying for a mortgage, it's important to understand how much house you can afford. A mortgage calculator helps you:</p>
      <ul>
        <li>Estimate your monthly payments</li>
        <li>Compare different loan terms and interest rates</li>
        <li>Understand the impact of your down payment</li>
        <li>See how extra payments can reduce your loan term and interest costs</li>
        <li>Plan your budget more effectively</li>
      </ul>
      
      <h2>Key Inputs for Accurate Calculations</h2>
      <p>To get the most accurate results from our mortgage calculator, you'll need to provide:</p>
      <ul>
        <li><strong>Home Price:</strong> The total purchase price of the home</li>
        <li><strong>Down Payment:</strong> The amount you plan to pay upfront</li>
        <li><strong>Loan Term:</strong> The length of your mortgage (typically 15, 20, or 30 years)</li>
        <li><strong>Interest Rate:</strong> The annual interest rate on your loan</li>
        <li><strong>Property Taxes:</strong> Annual property tax amount</li>
        <li><strong>Home Insurance:</strong> Annual insurance premium</li>
        <li><strong>HOA Fees:</strong> Monthly homeowners association fees, if applicable</li>
      </ul>
      
      <h2>Understanding the Results</h2>
      <p>Once you've entered your information, the calculator will provide:</p>
      <ul>
        <li><strong>Monthly Principal & Interest:</strong> The base payment toward your loan</li>
        <li><strong>Monthly Taxes & Insurance:</strong> Additional required payments</li>
        <li><strong>Total Monthly Payment:</strong> The combined amount you'll pay each month</li>
        <li><strong>Amortization Schedule:</strong> How your payments reduce your loan balance over time</li>
        <li><strong>Total Interest Paid:</strong> The total interest cost over the life of the loan</li>
      </ul>
      
      <h2>Tips for Using the Mortgage Calculator</h2>
      <ol>
        <li><strong>Try different scenarios:</strong> Adjust the loan term, interest rate, and down payment to see how they affect your monthly payment.</li>
        <li><strong>Consider extra payments:</strong> See how making additional principal payments can reduce your loan term and save on interest.</li>
        <li><strong>Include all costs:</strong> Don't forget to include property taxes, insurance, and HOA fees for a complete picture.</li>
        <li><strong>Be realistic:</strong> Use current market interest rates and accurate property tax information for your area.</li>
        <li><strong>Plan for the future:</strong> Consider how changes in your income or expenses might affect your ability to make payments.</li>
      </ol>
      
      <h2>Next Steps After Using the Calculator</h2>
      <p>After using our mortgage calculator, you might want to:</p>
      <ul>
        <li>Get pre-approved for a mortgage to confirm your budget</li>
        <li>Speak with a mortgage professional about loan options</li>
        <li>Start house hunting within your calculated price range</li>
        <li>Save for a larger down payment if the monthly payments are too high</li>
        <li>Explore ways to improve your credit score for better interest rates</li>
      </ul>
      
      <p>Our mortgage calculator is a valuable starting point for your home buying journey, but remember that actual loan terms and payments may vary. Always consult with a mortgage professional for personalized advice based on your specific financial situation.</p>
    `,
    publishDate: "2023-06-15",
    updateDate: "2023-12-10",
    author: "Financial Expert",
    category: "financial",
    relatedCalculator: "mortgage",
    image: "/placeholder.svg?height=600&width=1200",
  },
  // Add more blog posts here
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Calculator Suite Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishDate,
      modifiedTime: post.updateDate,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Generate article schema
  const articleJsonLd = generateArticleSchema({
    title: post.title,
    description: post.description,
    url: `https://calculatorsuite.com/blog/${post.slug}`,
    datePublished: post.publishDate,
    dateModified: post.updateDate,
    authorName: post.author,
    publisherName: "Calculator Suite",
    publisherLogo: "https://calculatorsuite.com/logo.png",
    image: post.image,
  })

  // Get related calculators
  const relatedCalculator = getAllCalculators().find((calc) => calc.slug === post.relatedCalculator)
  const relatedCalculators = getAllCalculators()
    .filter((calc) => calc.category === post.category)
    .filter((calc) => calc.slug !== post.relatedCalculator)
    .slice(0, 3)

  return (
    <main id="main-content" className="container py-8 md:py-12">
      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Breadcrumb navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}`, current: true },
        ]}
        className="mb-6"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{post.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>By {post.author}</span>
          <span>•</span>
          <time dateTime={post.publishDate}>
            {new Date(post.publishDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.updateDate !== post.publishDate && (
            <>
              <span>•</span>
              <span>
                Updated:{" "}
                {new Date(post.updateDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </>
          )}
        </div>

        <div className="relative rounded-lg overflow-hidden mb-8">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>

        <div className="prose max-w-none dark:prose-invert mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Related Calculator CTA */}
        {relatedCalculator && (
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Try Our {relatedCalculator.title}</h2>
                  <p className="text-muted-foreground mb-4">{relatedCalculator.description}</p>
                  <Button asChild>
                    <Link href={`/calculators/${relatedCalculator.slug}`}>Use Calculator Now</Link>
                  </Button>
                </div>
                <div className="p-4 bg-background rounded-lg border">
                  <LucideIcon name={relatedCalculator.icon} className="h-16 w-16 text-primary mx-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Calculators */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCalculators.map((calc) => (
              <Card key={calc.slug}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <LucideIcon name={calc.icon} className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{calc.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{calc.description}</p>
                  <Button variant="outline" asChild size="sm" className="w-full">
                    <Link href={`/calculators/${calc.slug}`}>Use Calculator</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
