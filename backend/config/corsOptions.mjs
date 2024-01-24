// /backend/config/corsOptions.js
const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3000","http://localhost:8080", "https:real-estate-management-system.onrender.com","real-estate-management-system.onrender.com"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
  };
  
  export default corsOptions;