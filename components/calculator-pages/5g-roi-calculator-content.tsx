import { FiveGROICalculator } from "@/components/calculators/5g-roi-calculator"

interface FiveGROICalculatorContentProps {
  jsonLd: any
}

export function FiveGROICalculatorContent({ jsonLd }: FiveGROICalculatorContentProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">5G Upgrade ROI Calculator</h2>
        <p className="text-muted-foreground mb-6">
          Calculate the return on investment for upgrading to 5G technology in your business. This calculator helps you
          understand the costs, benefits, and potential payback period for implementing 5G networks.
        </p>

        <FiveGROICalculator />

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Understanding 5G Technology & Business Impact</h3>
          <p>
            5G represents the fifth generation of cellular network technology, offering transformative capabilities that
            go far beyond previous generations. For businesses, 5G isn't just about faster connections—it enables new
            operational models, products, and services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-purple-500">Enhanced Speed</h4>
              <p className="text-sm mt-2">
                With peak speeds up to 10 Gbps (10-100x faster than 4G), 5G enables real-time data processing,
                high-definition video streaming, and rapid file transfers even in demanding environments.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-blue-500">Ultra-Low Latency</h4>
              <p className="text-sm mt-2">
                Response times as low as 1ms (compared to 50ms for 4G) make 5G critical for applications requiring
                real-time feedback, such as autonomous vehicles, remote surgery, and industrial automation.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-green-500">Massive Connectivity</h4>
              <p className="text-sm mt-2">
                Support for up to 1 million devices per square kilometer enables large-scale IoT deployments, smart
                cities, and connected factories without network congestion.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-yellow-500">Network Slicing</h4>
              <p className="text-sm mt-2">
                The ability to create multiple virtual networks with specific characteristics allows businesses to
                dedicate resources to critical applications while maintaining overall network efficiency.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-orange-500">Edge Computing</h4>
              <p className="text-sm mt-2">
                5G's architecture supports processing data closer to its source, reducing latency and bandwidth usage
                while enhancing privacy and enabling real-time analytics.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-red-500">Reliability</h4>
              <p className="text-sm mt-2">
                5G networks offer 99.999% availability, making them suitable for mission-critical applications where
                network downtime is not acceptable.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8">Industry-Specific 5G Applications</h3>

          <div className="space-y-4 mt-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Manufacturing</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <h5 className="text-sm font-medium">Applications:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                    <li>Smart factories with connected machinery</li>
                    <li>Augmented reality for worker assistance</li>
                    <li>Predictive maintenance using real-time data</li>
                    <li>Autonomous guided vehicles (AGVs)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium">Benefits:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                    <li>30-35% reduction in downtime</li>
                    <li>20-25% increase in production efficiency</li>
                    <li>15-20% reduction in maintenance costs</li>
                    <li>Improved worker safety and productivity reduction in maintenance costs</li>
                    <li>Improved worker safety and productivity</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Healthcare</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <h5 className="text-sm font-medium">Applications:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                    <li>Remote surgery and telemedicine</li>
                    <li>Real-time patient monitoring</li>
                    <li>AR/VR for medical training</li>
                    <li>Connected ambulances with real-time data transmission</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium">Benefits:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                    <li>Expanded access to specialized care</li>
                    <li>Reduced response times in emergencies</li>
                    <li>Improved patient outcomes</li>
                    <li>More efficient resource allocation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Retail</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <h5 className="text-sm font-medium">Applications:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                    <li>Immersive AR/VR shopping experiences</li>
                    <li>Real-time inventory management</li>
                    <li>Personalized in-store marketing</li>
                    <li>Cashierless checkout systems</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium">Benefits:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                    <li>15-20% increase in customer engagement</li>
                    <li>Reduced inventory costs by 10-15%</li>
                    <li>Increased conversion rates</li>
                    <li>Enhanced customer experience and loyalty</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Logistics & Transportation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <h5 className="text-sm font-medium">Applications:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                    <li>Fleet management and tracking</li>
                    <li>Autonomous vehicles and drones</li>
                    <li>Supply chain visibility</li>
                    <li>Predictive route optimization</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium">Benefits:</h5>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                    <li>10-15% reduction in fuel costs</li>
                    <li>20-30% improvement in delivery times</li>
                    <li>Reduced accidents and improved safety</li>
                    <li>Enhanced supply chain resilience</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6">5G Implementation Considerations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Private vs. Public Networks</h4>
              <p className="text-sm mt-2">
                Private 5G networks offer more control, security, and customization but at higher cost. Public networks
                provide faster deployment with lower upfront investment but less control. Hybrid approaches can balance
                these trade-offs.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Device Ecosystem</h4>
              <p className="text-sm mt-2">
                Ensure compatibility with existing and planned devices. Consider the availability and cost of 5G-capable
                equipment for your specific use cases, including smartphones, IoT sensors, and industrial equipment.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Security Requirements</h4>
              <p className="text-sm mt-2">
                5G introduces new security considerations, including network slicing security, edge computing
                vulnerabilities, and expanded attack surfaces due to more connected devices. Develop a comprehensive
                security strategy.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="font-medium">Integration Planning</h4>
              <p className="text-sm mt-2">
                Plan for how 5G will integrate with existing systems, including legacy networks, cloud infrastructure,
                and business applications. Consider middleware and APIs needed for seamless operation.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Note: This calculator provides estimates based on industry averages and the information provided. Actual
            costs and returns may vary based on specific implementation details, vendor selection, geographic location,
            and organizational factors. For a more accurate assessment, consider consulting with 5G implementation
            specialists.
          </p>
        </div>
      </div>
    </div>
  )
}
