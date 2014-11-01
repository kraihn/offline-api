# Offline API

---

1. Install required dependencies
    - `npm install -g gulp`
    - `npm install`
2. Run
    - `gulp`
    
JavaScript modifications are detected and trigger an automatic service restart.

JSON files are read on each request for easy modification, but new JSON files require a manual service restart.

---

Routes with logic should be added to ./routes/

Routes that are raw data should be added to ./public/data/

Routes are generated by removing the file extension, and replacing all periods with slashes in the filename. Ex: api.data.all.json --> /api/data/all