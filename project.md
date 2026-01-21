---
layout: page
title: Projects
permalink: /project/
---

<div class="category-archive-page">
  <!-- Category Header -->
  <div class="category-header">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <div class="category-icon">
          <span class="glyphicon glyphicon-wrench"></span>
        </div>
        <h1 class="category-title">Projects & Portfolio</h1>
        <p class="category-description">
          A showcase of applications, tools, and experiments I've built. From concept to deployment,
          explore the projects that represent my journey as a developer and the solutions I've created.
        </p>
        <div class="category-stats">
          {% assign project_posts = site.posts | where_exp: "post", "post.categories contains 'Project'" %}
          <span class="stat-item">
            <strong>{{ project_posts.size }}</strong> project{% if project_posts.size != 1 %}s{% endif %}
          </span>
          {% if project_posts.size > 0 %}
          <span class="stat-divider">•</span>
          <span class="stat-item">
            Latest: {{ project_posts.first.date | date: "%B %Y" }}
          </span>
          {% endif %}
        </div>
      </div>
    </div>
  </div>

  <!-- Search Section -->
  <div class="search-section">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="input-group search-box">
          <input type="text" id="search-input" class="form-control" placeholder="Search projects by name, tech stack, or description...">
          <span class="input-group-btn">
            <button class="btn btn-info" type="button" onclick="searchPosts()">
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
        <div id="search-info" class="search-info hidden">
          <span id="search-results-count"></span>
          <button class="btn btn-link btn-sm" onclick="clearSearch()">
            <span class="glyphicon glyphicon-remove"></span> Clear
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Posts Container -->
  <div id="posts-container">
    {% if project_posts.size > 0 %}
    <div class="projects-grid">
      <div id="all-posts">
        {% for post in project_posts %}
          <div class="project-item" 
               data-title="{{ post.title | downcase | escape }}" 
               data-content="{{ post.content | strip_html | downcase | escape }}"
               data-tags="{% for tag in post.tags %}{{ tag | downcase }} {% endfor %}"
               data-date="{{ post.date | date: '%Y-%m-%d' }}">
            
            <article class="project-card">
              {% if post.image %}
              <div class="project-image">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }}" class="project-img">
                <div class="project-overlay">
                  <div class="project-status">
                    {% if post.status == 'completed' %}
                      <span class="status-badge status-completed">✅ Completed</span>
                    {% elsif post.status == 'in-progress' %}
                      <span class="status-badge status-progress">🚧 In Progress</span>
                    {% elsif post.status == 'concept' %}
                      <span class="status-badge status-concept">💡 Concept</span>
                    {% else %}
                      <span class="status-badge status-default">🔧 Project</span>
                    {% endif %}
                  </div>
                  
                  {% if post.github_url or post.demo_url %}
                  <div class="project-links">
                    {% if post.demo_url %}
                      <a href="{{ post.demo_url }}" target="_blank" class="project-link demo-link">
                        <span class="glyphicon glyphicon-new-window"></span>
                        Demo
                      </a>
                    {% endif %}
                    {% if post.github_url %}
                      <a href="{{ post.github_url }}" target="_blank" class="project-link github-link">
                        <span class="glyphicon glyphicon-console"></span>
                        Code
                      </a>
                    {% endif %}
                  </div>
                  {% endif %}
                </div>
              </div>
              {% else %}
              <div class="project-placeholder">
                <span class="glyphicon glyphicon-folder-open"></span>
              </div>
              {% endif %}
              
              <div class="project-content">
                <div class="project-header">
                  <h3 class="project-title">
                    <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
                  </h3>
                  
                  <div class="project-meta">
                    <span class="project-date">
                      <span class="glyphicon glyphicon-calendar"></span>
                      {{ post.date | date: "%b %Y" }}
                    </span>
                    {% if post.tech_stack %}
                    <span class="tech-count">
                      <span class="glyphicon glyphicon-tags"></span>
                      {{ post.tech_stack | size }} technologies
                    </span>
                    {% endif %}
                  </div>
                </div>
                
                {% if post.excerpt %}
                <div class="project-excerpt">{{ post.excerpt | strip_html | truncatewords: 20 }}</div>
                {% endif %}
                
                {% if post.tech_stack %}
                <div class="tech-stack">
                  {% for tech in post.tech_stack limit: 6 %}
                    <span class="tech-badge">{{ tech }}</span>
                  {% endfor %}
                  {% if post.tech_stack.size > 6 %}
                    <span class="tech-badge tech-more">+{{ post.tech_stack.size | minus: 6 }} more</span>
                  {% endif %}
                </div>
                {% endif %}
                
                <div class="project-footer">
                  <a href="{{ post.url | relative_url }}" class="read-project-btn">
                    <span class="btn-text">View Project</span>
                    <span class="glyphicon glyphicon-arrow-right"></span>
                  </a>
                  
                  {% if post.featured %}
                    <div class="featured-project">
                      <span class="glyphicon glyphicon-star"></span>
                      Featured
                    </div>
                  {% endif %}
                </div>
              </div>
            </article>
          </div>
        {% endfor %}
      </div>
    </div>
    {% else %}
    <div class="empty-category">
      <div class="text-center">
        <span class="glyphicon glyphicon-folder-open" style="font-size: 64px; color: #ccc;"></span>
        <h3>No Projects Yet</h3>
        <p class="text-muted">Project showcases and portfolio pieces will appear here soon!</p>
      </div>
    </div>
    {% endif %}
    
    <!-- No Search Results -->
    <div id="no-results" class="no-results hidden">
      <div class="text-center">
        <span class="glyphicon glyphicon-search" style="font-size: 48px; color: #ccc;"></span>
        <h3>No projects found</h3>
        <p class="text-muted">Try different search terms or browse all projects.</p>
      </div>
    </div>
  </div>
  
  <!-- Pagination -->
  <nav id="pagination" class="text-center pagination-container">
    <ul class="pagination" id="pagination-list"></ul>
    <div class="pagination-info">
      <small class="text-muted" id="pagination-info"></small>
    </div>
  </nav>
</div>

<style>
/* Category Archive Styling */
.category-archive-page {
  margin: 20px 0;
}

/* Category Header */
.category-header {
  padding: 60px 0 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: -20px -15px 40px -15px;
  color: white;
  border-radius: 0 0 20px 20px;
}

.category-icon {
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0.9;
}

.category-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.category-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 24px;
  opacity: 0.95;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.category-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
}

.stat-divider {
  opacity: 0.7;
}

/* Search Section */
.search-section {
  margin-bottom: 40px;
}

.search-box {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-box .form-control {
  height: 45px;
  font-size: 16px;
  border-radius: 4px 0 0 4px;
}

.search-box .btn {
  height: 45px;
  border-radius: 0 4px 4px 0;
}

.search-info {
  margin-top: 15px;
  text-align: center;
  padding: 10px;
  background: #e1f5fe;
  border-radius: 4px;
  border-left: 4px solid #03a9f4;
}

/* Projects Grid */
.projects-grid {
  margin-bottom: 40px;
}

#all-posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.project-item {
  transition: transform 0.3s ease;
}

.project-item:hover {
  transform: translateY(-8px);
}

.project-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  box-shadow: 0 16px 48px rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.project-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-img {
  transform: scale(1.1);
}

.project-placeholder {
  height: 220px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 48px;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-status {
  align-self: flex-start;
}

.status-badge {
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.status-completed { border-left: 3px solid #28a745; }
.status-progress { border-left: 3px solid #ffc107; }
.status-concept { border-left: 3px solid #17a2b8; }
.status-default { border-left: 3px solid #6c757d; }

.project-links {
  display: flex;
  gap: 12px;
  align-self: flex-end;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.project-link:hover {
  background: white;
  color: #333;
  text-decoration: none;
  transform: translateY(-2px);
}

.demo-link:hover {
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.github-link:hover {
  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
}

.project-content {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-header {
  margin-bottom: 16px;
}

.project-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
}

.project-title a {
  color: #212529;
  text-decoration: none;
  transition: color 0.3s ease;
}

.project-title a:hover {
  color: #667eea;
  text-decoration: none;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #6c757d;
  font-size: 13px;
}

.project-meta .glyphicon {
  margin-right: 4px;
}

.project-date {
  font-weight: 500;
}

.tech-count {
  opacity: 0.8;
}

.project-excerpt {
  color: #4a5568;
  line-height: 1.6;
  font-size: 14px;
  margin-bottom: 16px;
  flex-grow: 1;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.tech-badge {
  background: #f1f3f8;
  color: #4c63d2;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid #e2e8f0;
}

.tech-more {
  background: #e2e8f0;
  color: #718096;
  font-style: italic;
}

.project-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #f1f3f4;
}

.read-project-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
}

.read-project-btn:hover {
  color: white;
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.featured-project {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffc107;
  font-size: 12px;
  font-weight: 600;
}

/* Empty State */
.empty-category {
  padding: 80px 20px;
  text-center;
}

.empty-category h3 {
  color: #6c757d;
  margin: 20px 0 10px 0;
}

/* No Results */
.no-results {
  padding: 80px 20px;
  text-center;
}

.no-results h3 {
  color: #6c757d;
  margin: 20px 0 10px 0;
}

/* Pagination */
.pagination-container {
  margin: 50px 0 30px 0;
}

.pagination {
  margin: 0 0 15px 0;
}

.pagination > li > a {
  color: #667eea;
  border-color: #dee2e6;
}

.pagination > li > a:hover {
  color: #5a67d8;
  background-color: #f8f9fa;
}

.pagination > .active > a {
  background-color: #667eea;
  border-color: #667eea;
}

/* Utility Classes */
.hidden {
  display: none !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .category-header {
    padding: 40px 20px 30px;
    margin: -20px -15px 30px -15px;
  }
  
  .category-title {
    font-size: 28px;
  }
  
  .category-description {
    font-size: 16px;
  }
  
  .category-stats {
    flex-direction: column;
    gap: 8px;
  }
  
  #all-posts {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .project-content {
    padding: 20px;
  }
  
  .project-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .category-header {
    padding: 30px 15px 20px;
  }
  
  .category-title {
    font-size: 24px;
  }
  
  .category-icon {
    font-size: 36px;
  }
  
  .project-image,
  .project-placeholder {
    height: 180px;
  }
  
  .project-content {
    padding: 16px;
  }
  
  .project-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
}
</style>

<script>
let currentPage = 1;
const postsPerPage = 12;
let allPosts = [];
let filteredPosts = [];

document.addEventListener('DOMContentLoaded', function() {
  allPosts = Array.from(document.querySelectorAll('.project-item'));
  filteredPosts = allPosts;
  showPage(1);
  setupPagination();
});

function searchPosts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  const searchInfo = document.getElementById('search-info');
  const searchCount = document.getElementById('search-results-count');
  const noResults = document.getElementById('no-results');
  
  if (searchTerm === '') {
    clearSearch();
    return;
  }
  
  filteredPosts = allPosts.filter(post => {
    const title = post.dataset.title || '';
    const content = post.dataset.content || '';
    const tags = post.dataset.tags || '';
    
    return title.includes(searchTerm) || 
           content.includes(searchTerm) || 
           tags.includes(searchTerm);
  });
  
  searchCount.textContent = `Found ${filteredPosts.length} project${filteredPosts.length !== 1 ? 's' : ''} matching "${document.getElementById('search-input').value}"`;
  searchInfo.classList.remove('hidden');
  
  if (filteredPosts.length === 0) {
    noResults.classList.remove('hidden');
    document.getElementById('all-posts').style.display = 'none';
  } else {
    noResults.classList.add('hidden');
    document.getElementById('all-posts').style.display = 'grid';
  }
  
  currentPage = 1;
  showPage(1);
  setupPagination();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('search-info').classList.add('hidden');
  document.getElementById('no-results').classList.add('hidden');
  document.getElementById('all-posts').style.display = 'grid';
  
  filteredPosts = allPosts;
  currentPage = 1;
  showPage(1);
  setupPagination();
}

function showPage(page) {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  
  allPosts.forEach(post => post.classList.add('hidden'));
  
  const postsToShow = filteredPosts.slice(startIndex, endIndex);
  postsToShow.forEach(post => {
    post.classList.remove('hidden');
  });
  
  currentPage = page;
  updatePaginationInfo();
}

function setupPagination() {
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginationList = document.getElementById('pagination-list');
  paginationList.innerHTML = '';
  
  if (totalPages <= 1) {
    document.getElementById('pagination').style.display = 'none';
    return;
  }
  
  document.getElementById('pagination').style.display = 'block';
  
  // Previous button
  const prevLi = document.createElement('li');
  if (currentPage === 1) prevLi.classList.add('disabled');
  prevLi.innerHTML = `<a href="#" onclick="changePage(${currentPage - 1}); return false;">&laquo;</a>`;
  paginationList.appendChild(prevLi);
  
  // Page numbers
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);
  
  for (let i = startPage; i <= endPage; i++) {
    const li = document.createElement('li');
    if (i === currentPage) li.classList.add('active');
    li.innerHTML = `<a href="#" onclick="changePage(${i}); return false;">${i}</a>`;
    paginationList.appendChild(li);
  }
  
  // Next button
  const nextLi = document.createElement('li');
  if (currentPage === totalPages) nextLi.classList.add('disabled');
  nextLi.innerHTML = `<a href="#" onclick="changePage(${currentPage + 1}); return false;">&raquo;</a>`;
  paginationList.appendChild(nextLi);
}

function changePage(page) {
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  if (page < 1 || page > totalPages) return;
  
  showPage(page);
  setupPagination();
  
  document.querySelector('.category-archive-page').scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}

function updatePaginationInfo() {
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage + 1;
  const endIndex = Math.min(currentPage * postsPerPage, totalPosts);
  
  const paginationInfo = document.getElementById('pagination-info');
  
  if (totalPosts === 0) {
    paginationInfo.textContent = '';
  } else {
    paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalPosts} projects`;
  }
}

// Search on Enter key
document.getElementById('search-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchPosts();
  }
});
</script>