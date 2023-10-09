sequenceDiagram
    participant User as User
    participant Browser as Browser
    User->>Browser: Enter URL "https://studies.cs.helsinki.fi/exampleapp/spa"
    Browser->>Browser: Initiate navigation to SPA
    Browser->>Browser: Load SPA content
    Browser-->>User: Display single-page app