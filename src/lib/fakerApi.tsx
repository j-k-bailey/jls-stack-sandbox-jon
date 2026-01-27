type FakerApiOptions<T> = {
  data?: T;
  minDelay?: number;
  maxDelay?: number;
  failureRate?: number; // 0–1
};

export async function fakerApi<T>({
  data,
  minDelay = 600,
  maxDelay = 1600,
  failureRate = 0.25,
}: FakerApiOptions<T>): Promise<T> {
  const delay =
    Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  await new Promise((res) => setTimeout(res, delay));

  if (Math.random() < failureRate) {
    throw new Error("Something went wrong. Please try again.");
  }

  return data as T;
}
