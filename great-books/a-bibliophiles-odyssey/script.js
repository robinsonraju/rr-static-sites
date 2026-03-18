const books = [
    {
        volume: "Vol 1",
        title: "The Iliad",
        link: "https://www.amazon.com/gp/product/B0F9XNCWLV",
        image: "images/vol1.jpg",
        status: "published"
    },
    {
        volume: "Vol 2",
        title: "The Odyssey",
        link: "https://www.amazon.com/gp/product/B0F9LC7S1J",
        image: "images/vol2.jpg",
        status: "published"
    },
    {
        volume: "Vol 3",
        title: "The Plays of Aeschylus",
        link: "https://www.amazon.com/gp/product/B0F9PWRPT2",
        image: "images/vol3.jpg",
        status: "published"
    },
    {
        volume: "Vol 4",
        title: "The Plays of Sophocles",
        link: "https://www.amazon.com/gp/product/B0F9TZ3YV8",
        image: "images/vol4.jpg",
        status: "published"
    },
    {
        volume: "Vol 5",
        title: "The Plays of Euripides",
        link: "https://www.amazon.com/gp/product/B0FBJYVQWR",
        image: "images/vol5.jpg",
        status: "published"
    },
    {
        volume: "Vol 6",
        title: "The Plays of Aristophanes",
        link: "#",
        image: "images/vol6.jpg",
        status: "coming_soon"
    },
    {
        volume: "Vol 7",
        title: "The History by Herodotus",
        link: "#",
        image: "images/vol7.jpg",
        status: "coming_soon"
    },
    {
        volume: "Vol 8",
        title: "History of the Peloponnesian War by Thucydides",
        link: "#",
        image: "images/vol8.jpg",
        status: "coming_soon"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const bookshelf = document.getElementById("bookshelf");

    books.forEach((book, index) => {
        const card = document.createElement("div");
        card.className = `book-card ${book.status === 'coming_soon' ? 'coming-soon' : ''}`;
        
        // Staggered animation delay for initial load
        card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';

        let badgeHtml = '';
        if (book.status === 'coming_soon') {
            badgeHtml = `<div class="coming-soon-badge">Coming Soon</div>`;
        }

        let linkText = book.status === 'coming_soon' ? 'In Progress' : 'View on Amazon';
        let linkHref = book.status === 'coming_soon' ? '#' : book.link;
        let linkTarget = book.status === 'coming_soon' ? '' : 'target="_blank" rel="noopener noreferrer"';

        card.innerHTML = `
            ${badgeHtml}
            <div class="book-cover-wrapper">
                <img src="${book.image}" alt="${book.title} Cover" class="book-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="fallback-cover" style="display: none;">
                    <div class="fallback-vol">${book.volume}</div>
                    <div class="fallback-title">${book.title}</div>
                </div>
            </div>
            <div class="book-info">
                <div class="book-vol">${book.volume}</div>
                <h2 class="book-title">${book.title}</h2>
                <a href="${linkHref}" class="book-amazon-link" ${linkTarget}>
                    ${linkText}
                </a>
            </div>
        `;

        bookshelf.appendChild(card);
    });
});

// Add keyframes dynamically for the staggered load animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);
