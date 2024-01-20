// script.js

window.addEventListener('load', (event) => {
    const usernameInput = document.getElementById('usernameInput');
    const repositoriesContainer = document.getElementById('repositoriesContainer');
    const paginationContainer = document.getElementById('pagination');
    const perPageDropdown = document.getElementById('perPageDropdown');
    const pageInfoContainer = document.getElementById('pageInfo');

    let currentPage = 1;
    let perPage = 10;
    let totalPages = 1;

    function searchRepositories() {
        const username = usernameInput.value.trim();
    
        if (!usernameInput || !repositoriesContainer || !paginationContainer || !perPageDropdown || !pageInfoContainer) {
            console.error('One or more elements not found.');
            return;
        }
    
        if (!username) {
            displayError('Please enter a GitHub username.');
            return;
        }
    
        console.log(`Fetching repositories for username: ${username}`);
    
        // Clear previous search results, pagination, and page info
        repositoriesContainer.innerHTML = '';
        paginationContainer.innerHTML = '';
        pageInfoContainer.innerHTML = '';
    
        // Show loading state
        showLoading();
    
        // Fetch repositories from GitHub API
        fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
            .then(response => {
                if (!response.ok) {
                    displayError('Error fetching repositories. Please try again.');
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(allRepositories => {
                hideLoading();
    
                if (allRepositories.length === 0) {
                    displayNoResults();
                    return;
                }
    
                // Calculate total pages based on the number of repositories and perPage value
                totalPages = Math.ceil(allRepositories.length / perPage);
    
                // Fetch repositories for the current page with the desired perPage value
                const startIdx = (currentPage - 1) * perPage;
                const endIdx = startIdx + perPage;
                const repositories = allRepositories.slice(startIdx, endIdx);
    
                // Display repositories
                displayRepositories(repositories);
    
                // Update the navigation buttons based on the total number of pages
                generateNavigationButtons();
    
                // Display current page and total pages
                displayPageInfo();
            })
            .catch(error => {
                console.error('Error:', error.message);
                hideLoading();
                displayError('An unexpected error occurred. Please try again.');
            });
    }
    

    function updatePerPage() {
        perPage = parseInt(perPageDropdown.value, 10);
        currentPage = 1; // Reset to the first page when changing perPage
        searchRepositories();
    }

    function showLoading() {
        if (!repositoriesContainer) {
            console.error('Repositories container not found.');
            return;
        }

        const loadingElement = document.createElement('div');
        loadingElement.classList.add('loading-message');
        loadingElement.innerText = 'Loading...';
        repositoriesContainer.appendChild(loadingElement);
    }

    function hideLoading() {
        const loadingElement = document.querySelector('#repositoriesContainer div.loading-message');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    function displayNoResults() {
        const noResultsElement = document.createElement('p');
        noResultsElement.innerText = 'No repositories found.';
        repositoriesContainer.appendChild(noResultsElement);
    }

    function displayError(message) {
        if (!repositoriesContainer) {
            console.error('Repositories container not found.');
            return;
        }

        const errorElement = document.createElement('p');
        errorElement.innerText = message;
        errorElement.style.color = 'red';
        repositoriesContainer.appendChild(errorElement);
    }

    function displayRepositories(repositories) {
        repositories.forEach(repository => {
            const repoCard = document.createElement('div');
            repoCard.classList.add('repo-card');

            repoCard.innerHTML = `
                <h2>${repository.name}</h2>
                <p>${repository.description || 'No description available.'}</p>
                <p>Stars: ${repository.stargazers_count}</p>
                <p>Topics: ${repository.topics.join(', ') || 'No topics available.'}</p>
                <a href="${repository.html_url}" target="_blank">View on GitHub</a>
            `;

            repositoriesContainer.appendChild(repoCard);
        });
    }

    function generateNavigationButtons() {
        if (!paginationContainer) {
            console.error('Pagination container not found.');
            return;
        }

        // Create a div to group the navigation buttons
        const buttonGroup = document.createElement('div');

        // Create "Previous" button
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.addEventListener('click', () => navigateToPage(currentPage - 1));
        prevButton.disabled = currentPage === 1; // Disable on the first page
        buttonGroup.appendChild(prevButton);

        // Create buttons for each page
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.addEventListener('click', () => navigateToPage(i));
            buttonGroup.appendChild(pageButton);
        }

        // Create "Next" button
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => navigateToPage(currentPage + 1));
        nextButton.disabled = currentPage === totalPages; // Disable on the last page
        buttonGroup.appendChild(nextButton);

        // Append the button group to the pagination container
        paginationContainer.innerHTML = '';
        paginationContainer.appendChild(buttonGroup);
    }

    function displayPageInfo() {
        if (!pageInfoContainer) {
            console.error('Page info container not found.');
            return;
        }

        const pageInfo = document.createElement('div');
        pageInfo.innerHTML = `Page ${currentPage} of ${totalPages}`;
        pageInfoContainer.appendChild(pageInfo);
    }

    function navigateToPage(targetPage) {
        if (targetPage >= 1 && targetPage <= totalPages) {
            currentPage = targetPage;
            searchRepositories();
        }
    }

    // Assign functions to the window object
    window.searchRepositories = searchRepositories;
    window.updatePerPage = updatePerPage;

    // Initial search on page load
    searchRepositories();
});
