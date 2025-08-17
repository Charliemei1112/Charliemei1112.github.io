// Load and render markdown content
async function loadMarkdownContent() {
    try {
        const response = await fetch('content.md');
        if (!response.ok) {
            throw new Error(`Failed to load content: ${response.status}`);
        }
        
        const markdownText = await response.text();
        
        // Configure marked options for better rendering
        marked.setOptions({
            breaks: true,
            gfm: true
        });
        
        // Convert markdown to HTML
        const htmlContent = marked.parse(markdownText);
        
        // Insert the HTML content
        const contentContainer = document.getElementById('markdown-content');
        if (contentContainer) {
            contentContainer.innerHTML = htmlContent;
        }
        
        console.log('Markdown content loaded successfully');
        
    } catch (error) {
        console.error('Error loading markdown content:', error);
        
        // Show error message
        const contentContainer = document.getElementById('markdown-content');
        if (contentContainer) {
            contentContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load content. Please try refreshing the page.</p>
                    <p class="error-detail">${error.message}</p>
                </div>
            `;
        }
    }
}

// Initialize content loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadMarkdownContent();
});
