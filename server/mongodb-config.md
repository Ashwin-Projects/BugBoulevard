# MongoDB Configuration

## Environment Variables

Create a `.env` file in the server directory with the following content:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster

# Server Configuration
PORT=4000
```

## Alternative: Set Environment Variable Directly

You can also set the environment variable directly when running the server:

### Windows (PowerShell):
```powershell
$env:MONGODB_URI="mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
npm run dev
```

### Windows (Command Prompt):
```cmd
set MONGODB_URI=mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
npm run dev
```

### Linux/Mac:
```bash
export MONGODB_URI="mongodb+srv://ashwinlakshminarasimhan46_db_user:codexcape@cluster.eml0w21.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"
npm run dev
```

## Testing the Connection

Once you've set the environment variable, you can test the connection by running:

```bash
cd server
npm run dev
```

The server should connect to your MongoDB Atlas cluster and display "Connected to MongoDB" in the console.
