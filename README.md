# bk02-automation — Opposition Engine

## Local Development

```bash
npm install
cp .env.example .env   # add your OPENROUTER_API_KEY
npm run dev
```

Visit `http://localhost:5173/oe-automation/`

---

## Ubuntu + Apache Deployment

### 1. Install Node.js on the server

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Copy files and install

```bash
# On the server, e.g. /var/www/oe-automation/
git clone <repo> /var/www/oe-automation
cd /var/www/oe-automation
npm install
```

### 3. Build the frontend

```bash
npm run build
# Produces dist/ — served statically by the Express app
```

### 4. Create .env

```bash
cp .env.example .env
nano .env   # set OPENROUTER_API_KEY and PORT=3001
```

### 5. Run the Node server with PM2

```bash
sudo npm install -g pm2
pm2 start server.js --name opposition-engine
pm2 save
pm2 startup   # follow the printed command to auto-start on reboot
```

### 6. Configure Apache as a reverse proxy

Enable required modules:
```bash
sudo a2enmod proxy proxy_http
sudo systemctl restart apache2
```

Add to your Apache virtual host (or a new `.conf` file in `/etc/apache2/sites-available/`):
```apache
<VirtualHost *:80>
    ServerName yourdomain.com

    # Proxy API calls to the Node server
    ProxyPass        /oe-automation/api  http://localhost:3001/oe-automation/api
    ProxyPassReverse /oe-automation/api  http://localhost:3001/oe-automation/api

    # Serve the built React app via Node
    ProxyPass        /oe-automation  http://localhost:3001/oe-automation
    ProxyPassReverse /oe-automation  http://localhost:3001/oe-automation
</VirtualHost>
```

Enable the site and reload:
```bash
sudo a2ensite your-site.conf
sudo systemctl reload apache2
```

Visit `http://yourdomain.com/oe-automation/`

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | *(required)* | Your OpenRouter API key |
| `OPENROUTER_MODEL` | `anthropic/claude-sonnet-4-5` | Any OpenRouter model ID |
| `PORT` | `3001` | Port the Node server listens on |
