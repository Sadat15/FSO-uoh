sequenceDiagram
    participant User as User
    participant Browser as Browser
    participant Webpage as "https://studies.cs.helsinki.fi/exampleapp/notes"
    User->>Browser: Enter text into text field
    User->>Browser: Click Save button
    Browser->>Webpage: Send POST request with note data
    Webpage->>Webpage: Process and save the note
    Webpage-->>Browser: Send response
    Browser-->>User: Display success message
