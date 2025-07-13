import './style.css'

// You can add your JavaScript code here
console.log('Vite + Tailwind CSS project loaded!')

/**
 * Adds a new conversation bubble to the conversation container
 * @param {string} text - The text content for the bubble
 * @param {boolean} isRight - Whether the bubble should be right-aligned (default: false)
 */
function addConversationBubble(text, isRight = false) {
    // Get the conversation container
    const conversationContainer = document.querySelector('.conversation');
    
    if (!conversationContainer) {
        console.error('Conversation container not found');
        return;
    }
    
    // Get the template
    const template = document.getElementById('conversation-bubble-template');
    
    if (!template) {
        console.error('Conversation bubble template not found');
        return;
    }
    
    // Clone the template content
    const bubbleDiv = template.content.cloneNode(true);
    const bubbleElement = bubbleDiv.querySelector('.conversation__bubble');
    
    // Add right-aligned styling if specified
    if (isRight) {
        bubbleElement.classList.add('conversation__bubble--right');
    }
    
    // Set the text content
    const textParagraph = bubbleElement.querySelector('.conversation__text');
    textParagraph.textContent = text;
    
    // Append bubble to conversation container
    conversationContainer.appendChild(bubbleDiv);
    
    // Scroll to the bottom to show the new message
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
    
    return bubbleElement;
}


async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Adds some placeholder conversation bubbles for testing on page load
 */
async function addPlaceholderBubbles() {
    await wait(150);
    addConversationBubble('Hello! This is a left-aligned placeholder.');
    await wait(150);
    addConversationBubble('Hi! This is a right-aligned placeholder.', true);
}

// Run the placeholder function when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', addPlaceholderBubbles);

// Example usage:
// addConversationBubble('Hello! This is a new message.');
// addConversationBubble('This is a right-aligned message.', true);

// Make the function available globally for testing
window.addConversationBubble = addConversationBubble; 