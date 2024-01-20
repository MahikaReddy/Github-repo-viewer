# Github-repo-viewer

# GitHub Repositories Viewer

This web application allows users to search for GitHub repositories based on a username, displaying the repositories with pagination. Users can customize the number of repositories displayed per page.

## Table of Contents

- [Setup](#setup)
- [Usage](#usage)
- [Assumptions](#assumptions)
- [Additional Notes](#additional-notes)

## Setup

To run this application locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/MahikaReddy/github-repo-viewer.git
   cd github-repo-viewer


Open in a Browser:
Open the index.html file in your preferred web browser.
Usage
Enter GitHub Username:

Type the GitHub username into the input field.
Set Repositories Per Page:

Use the dropdown menu to select the number of repositories to display per page (10, 25, 50, or 100).
Search for Repositories:

Click the "Search" button to fetch and display the repositories.
Pagination:

Use the pagination controls to navigate between pages.
Assumptions
The GitHub API is assumed to be available, and the application relies on the API for fetching repository data.
Pagination is implemented on the server-side, and the number of repositories per page can be customized by the user.
Additional Notes
Loading State: The application displays a loading message while fetching data from the GitHub API.
Error Handling: Appropriate error messages are displayed for different scenarios, such as invalid input or API errors.
Responsive Design: The application is designed to be responsive, adapting to different screen sizes.
Feel free to provide feedback or report issues on the GitHub repository.
