# Environment Configuration

This folder contains environment-specific configuration files.

## Files
- `.env.development`: Settings for local development.
- `.env.test`: Settings for running tests.
- `.env.production`: Settings for production builds.

## Usage in Next.js

By default, Next.js looks for `.env` files in the root directory. To use these files, you can:

1. **Manual Copy**: Copy the desired file to the root as `.env.local`:
   ```bash
   cp env/.env.development .env.local
   ```

2. **Symlink**: Create a symlink from the root to the desired file:
   ```bash
   ln -s env/.env.development .env.development
   ```

3. **Custom Script**: Update `package.json` to load them using a tool like `dotenv` or by passing the path if the tool supports it.
