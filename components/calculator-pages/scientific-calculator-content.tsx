import { ScientificCalculator } from "@/components/calculators/scientific-calculator"

interface ScientificCalculatorContentProps {
  jsonLd: any
}

export function ScientificCalculatorContent({ jsonLd }: ScientificCalculatorContentProps) {
  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto">
        <ScientificCalculator />
      </div>

      <div className="prose max-w-none dark:prose-invert">
        <h2>About Scientific Calculator</h2>
        <p>
          Our scientific calculator is a powerful tool designed for students, engineers, scientists, and anyone who
          needs to perform complex mathematical calculations. It offers a wide range of functions beyond basic
          arithmetic, including:
        </p>

        <ul>
          <li>
            <strong>Trigonometric Functions:</strong> Calculate sine, cosine, tangent, and their inverses in both
            degrees and radians.
          </li>
          <li>
            <strong>Logarithmic Functions:</strong> Compute natural logarithms (ln) and base-10 logarithms (log).
          </li>
          <li>
            <strong>Exponential Functions:</strong> Calculate powers, square roots, and exponential values.
          </li>
          <li>
            <strong>Memory Functions:</strong> Store and recall values for complex calculations.
          </li>
          <li>
            <strong>Constants:</strong> Access mathematical constants like π (pi) and e.
          </li>
        </ul>

        <h3>How to Use the Scientific Calculator</h3>
        <p>Using our scientific calculator is straightforward:</p>

        <ol>
          <li>Enter numbers using the number pad.</li>
          <li>Use the function buttons for specialized calculations.</li>
          <li>Toggle between degrees (DEG) and radians (RAD) for trigonometric functions.</li>
          <li>View your calculation history in the History tab.</li>
          <li>Use memory functions (MS, MR, MC, M+) for complex multi-step calculations.</li>
        </ol>

        <h3>Applications of Scientific Calculators</h3>
        <p>Scientific calculators are essential tools in many fields:</p>

        <ul>
          <li>
            <strong>Education:</strong> For mathematics, physics, chemistry, and engineering courses.
          </li>
          <li>
            <strong>Engineering:</strong> For design calculations, conversions, and problem-solving.
          </li>
          <li>
            <strong>Science:</strong> For data analysis, lab work, and research calculations.
          </li>
          <li>
            <strong>Finance:</strong> For complex financial calculations and statistical analysis.
          </li>
          <li>
            <strong>Architecture:</strong> For dimensional calculations and conversions.
          </li>
        </ul>

        <h3>Tips for Efficient Calculations</h3>
        <p>To get the most out of our scientific calculator:</p>

        <ul>
          <li>Use the memory functions for multi-step calculations.</li>
          <li>Check your angle mode (DEG or RAD) when performing trigonometric calculations.</li>
          <li>Review your calculation history to track your work.</li>
          <li>Use parentheses to ensure operations are performed in the correct order.</li>
          <li>For very complex calculations, break them down into smaller steps.</li>
        </ul>

        <p>
          Whether you're solving homework problems, working on a scientific project, or performing engineering
          calculations, our scientific calculator provides the functionality you need in an easy-to-use interface.
        </p>
      </div>
    </div>
  )
}
