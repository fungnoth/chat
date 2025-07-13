import './style.css'

// You can add your JavaScript code here
console.log('Vite + Tailwind CSS project loaded!')

// The full lorem ipsum string
const LOREM = `Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

/**
 * Returns a random segment of the lorem ipsum string
 * @returns {string} Random text segment
 */
function getPlaceholderText() {
    const words = LOREM.split(' ');
    if (words.length < 2) return LOREM;
    // Pick two random indices, ensure from < to
    let from = Math.floor(Math.random() * words.length);
    let to = Math.floor(Math.random() * words.length);
    if (from === to) to = (to + 1) % words.length;
    if (from > to) [from, to] = [to, from];
    // Slice and join the segment
    return words.slice(from, to + 1).join(' ');
}

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

/**
 * Handles form submission for user messages
 * @param {Event} event - The form submit event
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const input = form.querySelector('.user-form__input');
    const message = input.value.trim();
    
    // Don't add empty messages
    if (!message) {
        return;
    }
    
    // Add the user message (right-aligned)
    addConversationBubble(message, true);

    wait(400).then(() => {
        addConversationBubble(getPlaceholderText(), false);
    });
    
    // Clear the input field
    input.value = '';
    
    // Focus back to input for better UX
    input.focus();
}

/**
 * Initializes the chat functionality
 */
function initializeChat() {
    const form = document.querySelector('.user-form');
    const input = document.querySelector('.user-form__input');
    
    if (!form || !input) {
        console.error('Form or input not found');
        return;
    }
    
    // Add form submit event listener
    form.addEventListener('submit', handleFormSubmit);
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

// Initialize everything when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    initializeChat();
    addPlaceholderBubbles();
});

// Example usage:
// addConversationBubble('Hello! This is a new message.');
// addConversationBubble('This is a right-aligned message.', true);

// Make functions available globally for testing
window.addConversationBubble = addConversationBubble;
window.getPlaceholderText = getPlaceholderText; 