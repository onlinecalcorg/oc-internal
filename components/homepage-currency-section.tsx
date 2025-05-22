import type React from "react"
import Link from "next/link"

interface CurrencySectionProps {
  baseCurrency: string
  quoteCurrencies: string[]
  amount: number
}

const HomepageCurrencySection: React.FC<CurrencySectionProps> = ({ baseCurrency, quoteCurrencies, amount }) => {
  return (
    <section>
      <h2>Currency Conversions</h2>
      <ul>
        {quoteCurrencies.map((quoteCurrency) => (
          <li key={`${baseCurrency}-to-${quoteCurrency}`}>
            <Link href={`/convert-${baseCurrency}-to-${quoteCurrency}/${amount}`}>
              {amount} {baseCurrency.toUpperCase()} to {quoteCurrency.toUpperCase()}
            </Link>
          </li>
        ))}
        <li>
          <Link href={`/convert-${baseCurrency}-to-${quoteCurrencies[0]}`}>
            Convert {baseCurrency.toUpperCase()} to {quoteCurrencies[0].toUpperCase()}
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default HomepageCurrencySection
