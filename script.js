// Chapter data - you'll update this daily
const chapters = [
    {
        id: 1,
        title: "Chapter 1: The Beginning",
        date: "2024-01-01",
        fileName: "chapter1.html"
    },
    {
        id: 2,
        title: "Chapter 2: The Journey",
        date: "2024-01-02",
        fileName: "chapter2.html"
    }
    // Add new chapters here as you create them
];

// Function to display chapters
function displayChapters() {
    const container = document.getElementById('chapters-container');
    const countElement = document.getElementById('chapter-count');
    
    // Update chapter count
    countElement.textContent = chapters.length;
    
    // Clear container
    container.innerHTML = '';
    
    // Sort chapters by ID (newest first)
    const sortedChapters = [...chapters].sort((a, b) => b.id - a.id);
    
    // Create chapter items
    sortedChapters.forEach(chapter => {
        const chapterElement = document.createElement('div');
        chapterElement.className = 'chapter-item';
        chapterElement.innerHTML = `
            <h3>${chapter.title}</h3>
            <p class="chapter-date">Published: ${chapter.date}</p>
        `;
        
        // Add click event to load chapter
        chapterElement.addEventListener('click', () => {
            loadChapter(chapter.fileName);
        });
        
        container.appendChild(chapterElement);
    });
    
    // Load the latest chapter
    if (sortedChapters.length > 0) {
        loadLatestChapter(sortedChapters[0].fileName);
    }
}

// Function to load a chapter
function loadChapter(fileName) {
    fetch(`chapters/${fileName}`)
        .then(response => response.text())
        .then(content => {
            const latestContent = document.getElementById('latest-content');
            latestContent.innerHTML = content;
            
            // Scroll to the top of the chapter
            latestContent.scrollIntoView({ behavior: 'smooth' });
            
            // Update page title to show current chapter
            document.title = `My Daily Story - ${fileName.replace('.html', '')}`;
        })
        .catch(error => {
            console.error('Error loading chapter:', error);
            document.getElementById('latest-content').innerHTML = 
                '<p>Error loading chapter. Please try again.</p>';
        });
}

// Function to load the latest chapter
function loadLatestChapter(fileName) {
    fetch(`chapters/${fileName}`)
        .then(response => response.text())
        .then(content => {
            document.getElementById('latest-content').innerHTML = content;
        })
        .catch(error => {
            console.error('Error loading latest chapter:', error);
        });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', displayChapters);
