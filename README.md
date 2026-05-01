# Butuan Agri-Exchange (Barter 2.0)
**Transforming Home Gardens into a Hyper-Local Micro-Economy.**

## The Vision
In response to the 2026 food inflation and the city's "Gulay sa Panimalay" initiative, **Butuan Agri-Exchange** provides a Peer-to-Peer (P2P) marketplace for urban gardeners. We turn backyard surpluses—like an overabundance of eggplants or tomatoes—into a community resource through smart bartering.

## Industry Edge: The AI Twist
This isn't just a classifieds site. We leverage cutting-edge AI to streamline the trade:
* **Computer Vision Grading:** Automatic object detection categorizes and grades produce quality from a single photo via Cloudinary.
* **AI Negotiator:** A custom chatbot that suggests "Fair Barter" trades by fetching real-time market prices from Butuan's **Langihan** and **Central** markets.
* **Inflation Combatant:** Empowering residents to bypass retail markups by trading directly with neighbors.

## The "Speed-Build" Stack
Built with the 2026 developer "Gold Standard" for type-safety and performance:
* **Framework:** [T3 Stack](https://create.t3.gg/) (Next.js, TypeScript, tRPC, Tailwind CSS)
* **Database:** Prisma (with PostgreSQL)
* **Image Intelligence:** Cloudinary for AI auto-tagging and image optimization.
* **Deployment:** Vercel (CI/CD optimized).

## Project Structure
* `src/app`: Next.js App Router for high-performance routing.
* `src/server`: Type-safe backend logic using tRPC.
* `src/components`: Reusable UI built with Tailwind CSS.

## Getting Started
**Clone & Install:**
   ```bash
   git clone [https://github.com/oddru/AgriExchange-B2B.git](https://github.com/oddru/AgriExchange-B2B.git)
   cd AgriExchange-B2B
   npm install

