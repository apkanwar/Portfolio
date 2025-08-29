const wikiContent = {
    MongoDB: {
        title: "MongoDB",
        pages: [
            {
                slug: "mongodb/getting-started",
                title: "Getting Started with Mongo",
                content: [
                    { type: "callout", variant: "info", text: "Before getting started, please make a Mongo account." },
                    { type: "paragraph", text: "Before we get started with Mongo, we need to understand how Mongo works. Below will be a explaination on how it works." },
                    { type: "image", caption: "Figure: Explaining How Mongo organizes their components", alt: "MongoDB Diagram", src: "/mongo.png" },
                    {
                        type: "table", variant: 'column', list: [
                            {
                                Project: "A logical grouping of resources. A project contains one or more clusters.",
                                Cluster: "A set of MongoDB servers (replica set or sharded cluster). Think of it as your actual “database server” environment.",
                                Database: "Inside each cluster, you can create multiple databases.",
                                Collection: "Inside each database, you have collections (equivalent to tables in relational DBs).",
                                Documents: "JSON-like records inside a collection."
                            }
                        ]
                    },
                    {
                        type: "link",
                        href: "https://www.mongodb.com/products/tools/compass",
                        text: "MongoDB Compass Install"
                    },
                    { type: "callout", variant: "info", text: "Optional: Install MongoDB Compass to view your data without going to the website." },
                    { type: "callout", variant: "success", text: "🙌 Congrats, let's get you set up with MongoDB in your project!" }
                ]
            },
            {
                slug: "mongodb/connect",
                title: "Connect your Mongo Cluster Locally",
                content: [
                    { type: "heading", text: "Optional: Setting up MongoDB Compass" },
                    { type: "paragraph", text: "Create your project and create a cluster in that project. There will be a password for the owner user of the cluster, which will be used for the connection string." },
                    {
                        type: "code",
                        language: "command-line",
                        code: "mongodb+srv://<DB_USER>:<DB_PASSWORD>@<CLUSTER_NAME>.poeupmz.mongodb.net/"
                    },
                    { type: "callout", variant: "info", text: "DB_USER and CLUSTER_NAME fill already be filled out when you copy" },
                    { type: "paragraph", text: "Add a new connection in MongoDB Compass and enter the connection string. Now you should be able to see your cluster on your machine." },
                    { type: "heading", text: "Connecting MongoDB to Project" },
                    { type: "paragraph", text: "In your .env.local file, create a variable to store your connection string" },
                    {
                        type: "code",
                        language: "command-line",
                        code: "mongodb+srv://<DB_USER>:<DB_PASSWORD>@<CLUSTER_NAME>.poeupmz.mongodb.net/<DEFAULT_DB>?retryWrites=true&w=majority"
                    },
                    { type: "callout", variant: "info", text: "<default_db> - Choose a default db in case you forget to pick one in the code" },
                    { type: "paragraph", text: "Create a mongodb.js file in a /src/lib directory to connect to mongodb" },
                    {
                        type: "code",
                        language: "javascript",
                        code: `// src/lib/mongodb.js
const { MongoClient } = require("mongodb");

let _client;
let _clientPromise;

/** Lazily create (and cache) a MongoClient connection promise. */
async function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set."
    );
  }
  if (!_clientPromise) {
    _client = new MongoClient(uri);
    _clientPromise = _client.connect();
  }
  return _clientPromise;
}

/** Convenience: get a DB handle (defaults to 'my_app'). */
async function getDb(name = "my_app") {
  const client = await getMongoClient();
  return client.db(name);
}

const clientPromiseThenable = {
  then(onFulfilled, onRejected) {
    return getMongoClient().then(onFulfilled, onRejected);
  },
  catch(onRejected) {
    return getMongoClient().catch(onRejected);
  },
  finally(onFinally) {
    return getMongoClient().finally(onFinally);
  },
};

module.exports = clientPromiseThenable;
module.exports.getMongoClient = getMongoClient;
module.exports.getDb = getDb;`
                    },
                    { type: "callout", variant: "success", text: "🙌 Congrats, you've connected Mongo to your computer and project!" },
                ]
            },
            {
                slug: "mongodb/crud",
                title: "CRUD Operations",
                content: [
                    { type: "heading", text: "Create New Document(s) in Collection" },
                    {
                        type: "code",
                        language: "javascript",
                        code: `// /src/pages/api/index.js
import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db('my_app'); // Add DB Name
    const collection = db.collection('trades'); // Add Collection Name

    if (req.method === 'POST') {
        const payload = Array.isArray(req.body) ? req.body : [req.body]; // Get body of payload passed
        const docs = [];
        for (const t of payload) {
            // Get values from body
            const { symbol, name, buyPrice, sellPrice, shares, leverage, boughtAt, soldAt } = t || {};

            // Check if values are correct
            if (!symbol || buyPrice == null || shares == null || leverage == null) {
                return res.status(400).json({ error: 'symbol, buyPrice, shares, leverage are required' });
            }
            const levNum = Number(leverage);
            if (!Number.isFinite(levNum) || levNum <= 0) {
                return res.status(400).json({ error: 'leverage must be a positive number' });
            }
            const hasSoldDate = !!soldAt;
            const hasSellPrice = sellPrice != null && sellPrice !== '';
            if (hasSoldDate !== hasSellPrice) {
                return res.status(400).json({ error: 'soldAt and sellPrice must be provided together or both omitted' });
            }

            // Push to docs JSON variable
            docs.push({
                symbol,
                name: name || symbol,
                buyPrice: Number(buyPrice),
                sellPrice: hasSellPrice ? Number(sellPrice) : null,
                shares: Number(shares),
                leverage: levNum,
                boughtAt: boughtAt ? new Date(boughtAt) : null,
                soldAt: hasSoldDate ? new Date(soldAt) : null,
                createdAt: new Date(),
                lastModified: new Date(),
            });
        }

        // Create new collection(s)
        if (docs.length === 1) {
            const r = await collection.insertOne(docs[0]);
            return res.status(201).json({ _id: r.insertedId, ...docs[0] });
        } else {
            const r = await collection.insertMany(docs);
            return res.status(201).json({ insertedCount: r.insertedCount, ids: Object.values(r.insertedIds) });
        }
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end('Method Not Allowed');
}`
                    },
                    { type: "paragraph", text: "The code above is messy, but the table below explains which comments to look for." },
                    {
                        type: "table", variant: 'column', list: [
                            {
                                'Line 5 & 6': "Choose which db and collection to connect to",
                                'Line 12': "Chooses which request body elements you need from frontend to push to collection",
                                'Line 15': "Optional checks to make sure the correct values are given from frontend",
                                'Line 29': "Add all the fields as a JSON array to push as document in Mongo",
                                'Line 44': "Insert JSON arrays in mongo to store as documents in collection"
                            }
                        ]
                    },
                    { type: "heading", text: "Fetch Document(s) in Collection" },
                    { type: "paragraph", text: "Add this if statement to the same file as the Create, above the POST if statement." },
                    {
                        type: "code",
                        language: "javascript",
                        code: `// /src/pages/api/index.js
    if (req.method === 'GET') {
    // Limit for # of items to return
    const page = Math.max(1, parseInt(req.query.page || '1', 10));
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize || '10', 10)));
    const skip = (page - 1) * pageSize;

    // Search Params
    const q = (req.query.q || '').trim();
    const legacyName = (req.query.name || '').trim();
    const status = (req.query.status || '').trim();

    /**
     * Search for Name or Symbol
     * Filter Open, Closed Status
     */
    const and = [];
    if (q) {
      and.push({ $or: [
        { name:   { $regex: q, $options: 'i' } },
        { symbol: { $regex: q, $options: 'i' } },
      ]});
    } else if (legacyName) {
      and.push({ name: { $regex: legacyName, $options: 'i' } });
    }
    if (status === 'open')   and.push({ soldAt: { $in: [null, undefined] } });
    if (status === 'closed') and.push({ soldAt: { $ne: null } });

    // Create Filter and Find Docuemnts in Collection to the Limit Set
    const filter = and.length ? { $and: and } : {};
    const [items, total] = await Promise.all([
      collection.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize).toArray(),
      collection.countDocuments(filter),
    ]);

    return res.status(200).json({ items, total, page, pageSize, q: q || legacyName, status });
  }`
                    },
                    { type: "paragraph", text: "The code above is messy, but the table below explains which comments to look for." },
                    {
                        type: "table", variant: 'column', list: [
                            {
                                'Line 2': "Limit for # of items to return",
                                'Line 12-15': "Filters the collection if you have search and filters",
                                'Line 28': "Create filter and searches collection"
                            }
                        ]
                    },
                    { type: "heading", text: "Update or Delete Single Document in Collection" },
                    { type: "paragraph", text: "The reason we have update and delete in the same document is because we are modifing a specific document which is found through a unique key (Object ID)." },
                    {
                        type: "code",
                        language: "javascript",
                        code: `// /src/pages/api/[id].js
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id || !ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

  const client = await clientPromise;
  const db = client.db('my_app'); // Add DB Name
  const collection = db.collection('trades'); // Add Collection Name
  const _id = new ObjectId(id);

  if (req.method === 'PUT') {
    const { buyPrice, sellPrice, shares, leverage, boughtAt, soldAt } = req.body || {};
    if (buyPrice == null || shares == null || leverage == null) {
      return res.status(400).json({ error: 'buyPrice, shares, and leverage are required' });
    }
    const levNum = Number(leverage);
    if (!Number.isFinite(levNum) || levNum <= 0) {
      return res.status(400).json({ error: 'leverage must be a positive number' });
    }

    const existing = await collection.findOne({ _id });
    if (!existing) return res.status(404).json({ error: 'Not found' });

    // both-or-none rule
    const hasSoldDate  = !!soldAt;
    const hasSellPrice = sellPrice != null && sellPrice !== '';
    if (hasSoldDate !== hasSellPrice) {
      return res.status(400).json({ error: 'soldAt and sellPrice must be provided together or both omitted' });
    }

    const update = {
      buyPrice: Number(buyPrice),
      shares: Number(shares),
      leverage: levNum,
      boughtAt: boughtAt ? new Date(boughtAt) : null,
      lastModified: new Date(),
    };
    if (hasSoldDate) {
      update.soldAt   = new Date(soldAt);
      update.sellPrice = Number(sellPrice);
    } else {
      update.soldAt = null;
      update.sellPrice = null;
    }

    const result = await collection.updateOne({ _id }, { $set: update });
    return res.status(200).json({ ok: result.modifiedCount === 1 });
  }

  if (req.method === 'DELETE') {
    const r = await collection.deleteOne({ _id });
    return res.status(200).json({ ok: r.deletedCount === 1 });
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end('Method Not Allowed');
}`
                    },
                    { type: "heading", text: "Delete Multiple Documents in Collection" },
                    {
                        type: "code",
                        language: "javascript",
                        code: `// /src/pages/api/bulk-delete.js
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { ids } = req.body || {};
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'ids array required' });
        }

        // Convert to ObjectId, skip invalids
        const objectIds = ids
            .map((id) => {
                try { return new ObjectId(id); } catch { return null; }
            })
            .filter(Boolean);

        if (objectIds.length === 0) {
            return res.status(400).json({ error: 'No valid ids' });
        }

        const client = await clientPromise;
        const db = client.db('my_app'); // Add DB Name
        const result = await db.collection('trades').deleteMany({ _id: { $in: objectIds } }); // Add Collection Name

        return res.status(200).json({
            ok: true,
            deletedCount: result.deletedCount || 0,
            requested: ids.length,
            processed: objectIds.length,
        });
    } catch (e) {
        console.error('bulk-delete error', e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}`
                    },
                    { type: "callout", variant: "success", text: "🙌 Congrats, you've setup the API calls that you would need to make in your app to modify your Mongo database." },
                ]
            },
            {
                slug: "mongodb/frontend",
                title: "Linking CRUD to Frontend",
                content: [
                    { type: "heading", text: "Add Documents" },
                    { type: "paragraph", text: "You need to input the payload object on Line 5 and this try catch can go inside a function that can be triggered on a button click." },
                    {
                        type: "code",
                        language: "javascript",
                        code: `try {
    const res = await fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) { setMessage('Save All failed'); return; }
    setCart([]); setQuery(''); setResults([]);
    setSuccessMessage('New Trades Saved!');
    setSearchInfo('');
} catch (e) {
    console.error('save error', e);
    setSuccessMessage('Save All failed');
}`
                    },
                    { type: "heading", text: "Search Documents" },
                    {
                        type: "code",
                        language: "javascript",
                        code: `const [page, setPage] = useState(1);
const [nameQ, setNameQ] = useState("");

async function load(p = page) {
    try {
        const params = new URLSearchParams({ page: String(p), pageSize: String(pageSize), q: nameQ, status });
        const res = await fetch('/api/trades?{params}');
        const data = await res.json();
        setRows(data.items || []);
        setTotal(data.total || 0);
        setPage(data.page || p);
    } catch {
        setError("Failed to load trades");
    } finally {
        setLoading(false);
    }
}`
                    },
                    { type: "callout", variant: "info", text: "nameQ is the search term using when searching. \n {params} should be ${params.toString()} on Line 7" },
                    { type: "heading", text: "Edit Document" },
                    { type: "paragraph", text: "Editing Documents is longer due to having to mutiple actions the user can take while editing." },

                    {
                        type: "code",
                        language: "javascript",
                        code: `const [editingId, setEditingId] = useState(null);
const [form, setForm] = useState({ buyPrice: "", sellPrice: "", shares: "", boughtAt: "", soldAt: "", leverage: "" });
const [savingId, setSavingId] = useState(null);

const startEdit = (r) => {
    setEditingId(r._id);
    setForm({
        buyPrice: r.buyPrice?.toFixed?.(2) ?? "",
        sellPrice: r.sellPrice != null ? Number(r.sellPrice).toFixed(2) : "",
        shares: r.shares ?? "",
        boughtAt: r.boughtAt ? new Date(r.boughtAt).toISOString().slice(0, 10) : "",
        soldAt: r.soldAt ? new Date(r.soldAt).toISOString().slice(0, 10) : "",
        leverage: r.leverage != null ? String(r.leverage) : "1",
    });
    setError("");
};
const cancelEdit = () => {
    setEditingId(null);
    setForm({ buyPrice: "", sellPrice: "", shares: "", boughtAt: "", soldAt: "", leverage: "" });
};
const onEdit = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

const saveRow = async (id) => {
    try {
        setSavingId(id);
        const body = {
            buyPrice: Number(form.buyPrice),
            shares: Number(form.shares),
            boughtAt: form.boughtAt || null,
            soldAt: form.soldAt || null,
            sellPrice: hasSellPrice ? Number(form.sellPrice) : null,
            leverage: form.leverage === "" ? 1 : Number(form.leverage),
        };
        const res = await fetch('/api/trades/{id}', { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (!res.ok) throw new Error("Update failed");
        await load(page);
        cancelEdit();
    } catch {
        setError("Failed to save changes.");
    } finally {
        setSavingId(null);
    }
};`
                    },
                    { type: "callout", variant: "info", text: "{id} should be ${id} on Line 34" },
                    { type: "heading", text: "Delete Documents" },
                    { type: "paragraph", text: "" },
                    {
                        type: "code",
                        language: "javascript",
                        code: `const [selectedIds, setSelectedIds] = useState(new Set());

// Delete Sigle Document
const deleteRow = async (id) => {
    if (!confirm("Delete this trade?")) return;
    try {
        const res = await fetch('/api/trades/{id}', { method: "DELETE" });
        if (!res.ok) throw new Error("Delete failed");
        await load(page);
    } catch {
        setError("Failed to delete trade.");
    }
};

// Delete Mutiple Documents
const deleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm('Delete {selectedIds.size} selected trade(s)?')) return;
    try {
        const res = await fetch('/api/trades/bulk-delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids: Array.from(selectedIds) }),
        });
        if (!res.ok) throw new Error('Bulk delete failed');
        clearSelection();
        await load(page);
    } catch {
        setError('Failed to delete some trades.');
    }
};`
                    },
                    { type: "callout", variant: "info", text: "{id} should be ${id} on Line 6 \n {selectedIds.size} should be ${selectedIds.size} on Line 16" },
                    { type: "callout", variant: "success", text: "🙌 Congrats, your application is now set up with a mongo backend!" },
                ]
            }
        ]
    },
    Docker: {
        title: "Docker",
        pages: [
            {
                slug: "docker/file-setup",
                title: "Setting up Docker Files",
                content: [
                    { type: "paragraph", text: "Assuming that you have already installed the docker app on my computer and have it running and your NextJS project is already set up." },
                    { type: "heading", text: "Create Dockerfile" },
                    { type: "paragraph", text: "In your NextJS project, create a 'Dockerfile' file and paste the following:" },
                    { type: "callout", variant: "info", text: "This will create a docker image using Node (V22 in code) and either build the Docker Image using the project or run the image on port localhost:3000" },
                    {
                        type: "code",
                        language: "docker",
                        code: `### /Dockerfile
# ---- Build stage ----
FROM node:22-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

# Install dependencies with clean, repeatable lockfile install
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Next.js needs these at runtime
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Only copy what the server needs to run
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# If you have next.config.js (or similar runtime files), include them:
COPY next.config.js ./

EXPOSE 3000
# Ensure your package.json has:  "start": "next start -p 3000 -H 0.0.0.0"
CMD ["npm", "start"]`
                    },
                    { type: "heading", text: "Create Docker Compose" },
                    { type: "paragraph", text: "This file references the app image from Dockerfile and the mongo image from DockerHub. Follow image setup process for other needed images." },
                    {
                        type: "code",
                        language: "docker",
                        code: `### /docker.compose.yml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - MONGODB_URI=<MONGO_DB_URL>
    # depends_on:
    #   - mongo

  # mongo:
  #   image: mongo
  #   ports:
  #     - "27017:27017"
  #   environment:
  #     MONGO_INITDB_ROOT_USERNAME: admin
  #     MONGO_INITDB_ROOT_PASSWORD: password
  
  #mongo-express:
  #  image: mongo-express
  #  ports:
  #    - "8081:8081"
  #  environment:
  #    ME_CONFIG_MONGODB_SERVER: mongo
  #    ME_CONFIG_MONGODB_ADMINUSERNAME: admin
  #    ME_CONFIG_MONGODB_ADMINPASSWORD: password
  #    ME_CONFIG_MONGODB_AUTH_DATABASE: admin
  #  depends_on:
  #    - mongo`
                    },
                    { type: "callout", variant: "warning", text: "I have commented out the mongo and mongo-express image for builds as I don't need to test this app on a local mongo database." },
                    { type: "heading", text: "Create Docker Ignore" },
                    { type: "paragraph", text: "This file is similar to a .gitignore and will mostly ignore the same files." },
                    {
                        type: "code",
                        language: "docker",
                        code: `node_modules
.next
.git
.gitignore
Dockerfile
docker-compose*
README.md
*.log
.env
.env.*`
                    },
                    { type: "callout", variant: "success", text: "🙌 Congrats, you have completed setting up Docker in your NextJS project!" },
                ]
            },
            {
                slug: "docker/aws",
                title: "Setting up AWS",
                content: [
                    { type: "callout", variant: "info", text: "Before getting started, please make a AWS account. Seperate from your Amazon account." },
                    { type: "heading", text: "Create ECR Repository" },
                    {
                        type: "link",
                        href: "https://us-east-1.console.aws.amazon.com/ecr/private-registry/repositories?region=us-east-1",
                        text: "AWS ECR Page"
                    },
                    { type: "paragraph", text: "This is where your Docker Images will be stored" },
                    { type: "heading", text: "Create ECS Cluster" },
                    {
                        type: "link",
                        href: "https://us-east-1.console.aws.amazon.com/ecs/v2/clusters?region=us-east-1",
                        text: "AWS ECS Cluster Page",
                        otherText: "Use AWS Fargate"
                    },
                    { type: "paragraph", text: "This is where your Docker containers are kept for your app. This also allows your app to run mutiple containers if needed." },
                    { type: "heading", text: "Create ECS Task Definition" },
                    {
                        type: "link",
                        href: "https://us-east-1.console.aws.amazon.com/ecs/v2/task-definitions?region=us-east-1",
                        text: "AWS Task Definition Page"
                    },
                    { type: "paragraph", text: "Go to the Container and put in the following details and modify them if needed" },
                    {
                        type: "list", variant: "unordered", list: [
                            "Image URI = <ECR_REPO_URI>:<image_tag>",
                            "Port = 3000",
                            "CPU = 0.25vCPU",
                            "Memory = 0.5GB",
                            "Add environment variables"
                        ]
                    },
                    { type: "heading", text: "Create ECS Service" },
                    { type: "paragraph", text: "Go inside your cluster and create a new service. Input your task that was created and add networking and security if needed." },
                    { type: "heading", text: "Create IAM User" },
                    {
                        type: "link",
                        href: "https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/users",
                        text: "AWS IAM Users Page",
                        otherText: "with policy = AmazonEC2ContainerRegistryFullAccess"
                    },
                    { type: "paragraph", text: "You can choose whatever policy. But this is what you need for a docker setup." },
                    { type: "callout", variant: "warning", text: "Make sure to copy the AWS Access Key ID and Secret Access Key for the next step, otherwise you will have to recreate the user." },
                    { type: "heading", text: "Logging into AWS in Terminal" },
                    {
                        type: "code",
                        language: "command-line",
                        code: "aws configure"
                    },
                    { type: "paragraph", text: "Enter the following details when asked in Terminal. Anything else can just remain the default." },
                    {
                        type: "list", variant: "unordered", list: [
                            "AWS Access Key ID",
                            "AWS Secret Access Key",
                            "Default Region Name"
                        ]
                    },
                    {
                        type: "code",
                        language: "command-line",
                        code: "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com"
                    },
                    { type: "callout", variant: "warning", text: "Login to AWS using the IAM user and remember to change the <account_id>" },
                    { type: "callout", variant: "success", text: "🙌 Congrats, you have completed setting up your AWS account to run the Docker Image and Container!" },
                ]
            },
            {
                slug: "docker/build-deploy",
                title: "Build and Deploy",
                content: [
                    { type: "heading", text: "Running the Docker Image Locally" },
                    { type: "paragraph", text: "Before pushing the image to AWS, we need to run the image locally and should test if it works properly." },
                    {
                        type: "code",
                        language: "command-line",
                        code: "docker buildx build --platform linux/amd64 -t <APP_NAME>:local --load ."
                    },
                    { type: "paragraph", text: "Above, we build the image. We can call it any APP_NAME and have a local copy of it." },
                    {
                        type: "code",
                        language: "command-line",
                        code: "docker run --rm -it -p 3000:3000 --env-file .env <APP_NAME>:local"
                    },
                    { type: "paragraph", text: "Next, we run the image and also give it any environment variables that it needs. These are the same environment variables that we set up in the ECS task definition. This time they go in the .env file of your project" },
                    { type: "heading", text: "Pushing the Local Image to ECR" },
                    {
                        type: "code",
                        language: "command-line",
                        code: "docker tag <APP_NAME>:local <ECR_REPO_URI>:<IMAGE_TAG>"
                    },
                    { type: "paragraph", text: "We can start by link the local image we created to the ECR repo and add the 'latest' <IMAGE_TAG>" },

                    {
                        type: "code",
                        language: "command-line",
                        code: "docker buildx build --platform linux/amd64 -t '<ECR_REPO_URI>:<IMAGE_TAG>' --push ."
                    },
                    { type: "paragraph", text: "We can run a similar docker build command as the local run, but this time we are pushing the image to ECR, not load the image to run it." },
                    { type: "paragraph", text: "Finally, go to your AWS ECS > Cluster > Service, and Force New Deployment" },
                    { type: "callout", variant: "success", text: "🙌 Congrats, you have completed creating a docker image and pushing it for your project!" },
                ]
            },
            {
                slug: "docker/useful-commands",
                title: "Useful Commands",
                content: [
                    { type: "paragraph", text: "This page is for any useful Docker commands" },
                    { type: "heading", text: "Commands" },
                    { type: "paragraph", text: "1. View Docker Images" },
                    {
                        type: "code",
                        language: "bash",
                        code: `docker images`
                    },
                    { type: "paragraph", text: "2. Remove <none> tagged images" },
                    {
                        type: "code",
                        language: "bash",
                        code: `docker image prune`
                    },
                    { type: "paragraph", text: "3. Remove spefic image" },
                    {
                        type: "code",
                        language: "bash",
                        code: `docker rmi <image_id_or_name>`
                    },
                    { type: "paragraph", text: "4. View all containers" },
                    {
                        type: "code",
                        language: "bash",
                        code: `docker ps -a`
                    },
                    { type: "paragraph", text: "5. Remove specific container" },
                    {
                        type: "code",
                        language: "bash",
                        code: `docker stop <container_id_or_name>
docker rm <container_id_or_name>`
                    },
                    { type: "paragraph", text: "6. Store Environment Variables" },
                    {
                        type: "code",
                        language: "bash",
                        code: `export MONGODB_URI="mongodb://localhost:27017"
echo $MONGODB_URI`
                    },
                ]
            }
        ]
    }
};

export default wikiContent;