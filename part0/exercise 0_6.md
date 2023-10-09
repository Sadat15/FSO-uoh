sequenceDiagram
    participant User as User
    participant Browser as Browser
    Browser->>Browser: User interacts with the single-page app
    Browser->>Browser: User enters new note content
    Browser->>Browser: User clicks the 'Create Note' button
    Browser->>Browser: Send a POST request to the server
    Browser-->>Browser: Receive a response from the server
    Browser-->>User: Display success message or update the UI