import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface DecimalToFractionResultProps {
  decimal: string
  numerator: number
  denominator: number
  simplified: {
    numerator: number
    denominator: number
  }
  mixed?: {
    whole: number
    numerator: number
    denominator: number
  }
  equivalentDecimals: string[]
}

export function DecimalToFractionResult({
  decimal,
  numerator,
  denominator,
  simplified,
  mixed,
  equivalentDecimals,
}: DecimalToFractionResultProps) {
  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/calculators">Calculators</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/decimal-to-fraction">Decimal to Fraction</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/decimal-to-fraction/${decimal}`}>{decimal}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Converting {decimal} to a Fraction</CardTitle>
            <CardDescription>Step-by-step explanation of how to convert {decimal} to a fraction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="rounded-lg bg-slate-50 p-6 dark:bg-slate-900">
                <h2 className="mb-4 text-xl font-semibold" id="result">
                  Result
                </h2>
                <div className="mb-6 flex flex-col items-center justify-center gap-4 md:flex-row">
                  <div className="text-2xl font-medium">{decimal} =</div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">{simplified.numerator}</div>
                    <div className="h-1 w-full bg-slate-300 dark:bg-slate-700"></div>
                    <div className="text-2xl font-bold">{simplified.denominator}</div>
                  </div>
                </div>

                {mixed && (
                  <div className="mt-4 flex flex-col items-center justify-center gap-4 md:flex-row">
                    <div className="text-xl font-medium">Mixed number:</div>
                    <div className="flex items-center">
                      <div className="text-xl font-bold">{mixed.whole}</div>
                      <div className="ml-2 flex flex-col items-center">
                        <div className="text-xl font-bold">{mixed.numerator}</div>
                        <div className="h-1 w-full bg-slate-300 dark:bg-slate-700"></div>
                        <div className="text-xl font-bold">{mixed.denominator}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold" id="step-1">
                  Step 1: Identify the number of decimal places
                </h2>
                <p>
                  The decimal {decimal} has {decimal.split(".")[1]?.length || 0} decimal places.
                </p>

                <h2 className="text-xl font-semibold" id="step-2">
                  Step 2: Multiply by the appropriate power of 10
                </h2>
                <p>
                  Multiply by 10<sup>{decimal.split(".")[1]?.length || 0}</sup> = {denominator} to eliminate the decimal
                  point.
                </p>
                <p>
                  {decimal} × {denominator} = {numerator}
                </p>

                <h2 className="text-xl font-semibold" id="step-3">
                  Step 3: Write as a fraction
                </h2>
                <div className="flex items-center gap-2">
                  <p>{decimal} =</p>
                  <div className="flex flex-col items-center">
                    <div>{numerator}</div>
                    <div className="h-1 w-full bg-slate-300 dark:bg-slate-700"></div>
                    <div>{denominator}</div>
                  </div>
                </div>

                <h2 className="text-xl font-semibold" id="step-4">
                  Step 4: Simplify the fraction
                </h2>
                <p>
                  Find the greatest common divisor (GCD) of {numerator} and {denominator}.
                </p>
                <p>
                  GCD({numerator}, {denominator}) = {numerator / simplified.numerator}
                </p>
                <p>Divide both the numerator and denominator by the GCD:</p>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div>{numerator}</div>
                    <div className="h-1 w-full bg-slate-300 dark:bg-slate-700"></div>
                    <div>{denominator}</div>
                  </div>
                  <p>=</p>
                  <div className="flex flex-col items-center">
                    <div>
                      {numerator} ÷ {numerator / simplified.numerator}
                    </div>
                    <div className="h-1 w-full bg-slate-300 dark:bg-slate-700"></div>
                    <div>
                      {denominator} ÷ {numerator / simplified.numerator}
                    </div>
                  </div>
                  <p>=</p>
                  <div className="flex flex-col items-center">
                    <div>{simplified.numerator}</div>
                    <div className="h-1 w-full bg-slate-300 dark:bg-slate-700"></div>
                    <div>{simplified.denominator}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Conversions</CardTitle>
            <CardDescription>Other decimal to fraction conversions you might find useful</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {equivalentDecimals.map((d) => (
                <li key={d}>
                  <Link
                    href={`/decimal-to-fraction/${d}-as-a-fraction`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {d} as a fraction
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Fraction Conversions</CardTitle>
            <CardDescription>Popular decimal to fraction conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <Link
                  href="/decimal-to-fraction/0.5-as-a-fraction"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  0.5 as a fraction
                </Link>
              </li>
              <li>
                <Link
                  href="/decimal-to-fraction/0.25-as-a-fraction"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  0.25 as a fraction
                </Link>
              </li>
              <li>
                <Link
                  href="/decimal-to-fraction/0.75-as-a-fraction"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  0.75 as a fraction
                </Link>
              </li>
              <li>
                <Link
                  href="/decimal-to-fraction/0.33-as-a-fraction"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  0.33 as a fraction
                </Link>
              </li>
              <li>
                <Link
                  href="/decimal-to-fraction/0.125-as-a-fraction"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  0.125 as a fraction
                </Link>
              </li>
              <li>
                <Link
                  href="/decimal-to-fraction/0.375-as-a-fraction"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  0.375 as a fraction
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
