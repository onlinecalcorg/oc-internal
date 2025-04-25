export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}

// Function to find the greatest common divisor (GCD)
export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const temp = b
    b = a % b
    a = temp
  }
  return a
}
