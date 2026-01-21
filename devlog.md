---
layout: page
title: Devlog
permalink: /devlog/
---

<div class="category-archive-page">
  <!-- Category Header -->
  <div class="category-header">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <div class="category-icon">
          <span class="glyphicon glyphicon-cog"></span>
        </div>
        <h1 class="category-title">Development Log</h1>
        <p class="category-description">
          Technical insights, development updates, and behind-the-scenes stories from my coding journey.
          Follow along as I build, learn, and share my development experiences.
        </p>
        <div class="category-stats">
          {% assign devlog_posts = site.posts | where_exp: "post", "post.categories contains 'Devlog'" %}
          <span class="stat-item">
            <strong>{{ devlog_posts.size }}</strong> post{% if devlog_posts.size != 1 %}s{% endif %}
          </span>
          {% if devlog_posts.size > 0 %}
          <span class="stat-divider">•</span>
          <span class="stat-item">
            Latest: {{ devlog_posts.first.date | date: "%B %Y" }}
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
          <input type="text" id="search-input" class="form-control" placeholder="Search devlog posts...">
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button" onclick="searchPosts()">
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
    {% assign devlog_posts = site.posts | where_exp: "post", "post.categories contains 'Devlog'" %}
    {% if devlog_posts.size > 0 %}
    <div class="devlog-list">
      <div id="all-posts">
        {% for post in devlog_posts %}
          <div class="devlog-item" 
               data-title="{{ post.title | downcase | escape }}" 
               data-content="{{ post.content | strip_html | downcase | escape }}"
               data-tags="{% for tag in post.tags %}{{ tag | downcase }} {% endfor %}"
               data-date="{{ post.date | date: '%Y-%m-%d' }}">
            
            <article class="devlog-card">
              <div class="row">
                <div class="col-md-9 col-sm-8">
                  <div class="devlog-content">
                    <div class="devlog-meta">
                      <span class="devlog-date">
                        <span class="glyphicon glyphicon-calendar"></span>
                        {{ post.date | date: "%B %d, %Y" }}
                      </span>
                      {% assign word_count = post.content | strip_html | number_of_words %}
                      {% assign reading_time = word_count | divided_by: 200 | plus: 1 %}
                      <span class="reading-time">
                        <span class="glyphicon glyphicon-time"></span>
                        {{ reading_time }} min read
                      </span>
                      {% if post.featured %}
                        <span class="featured-badge">
                          <span class="glyphicon glyphicon-star"></span>
                          Featured
                        </span>
                      {% endif %}
                    </div>
                    
                    <h3 class="devlog-title">
                      <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
                    </h3>
                    
                    {% if post.excerpt %}
                    <div class="devlog-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</div>
                    {% endif %}
                    
                    {% if post.tags.size > 0 %}
                    <div class="devlog-tags">
                      <span class="glyphicon glyphicon-tags"></span>
                      {% for tag in post.tags limit: 4 %}
                        <span class="tag">{{ tag }}</span>
                      {% endfor %}
                    </div>
                    {% endif %}
                  </div>
                </div>
                
                <div class="col-md-3 col-sm-4">
                  <div class="devlog-actions">
                    {% if post.image %}
                      <div class="devlog-thumbnail">
                        {% assign image_url = post.image %}
                        {% if image_url contains '/images/' %}
                          {% assign image_url = image_url %}
                        {% endif %}
                        <img src="{{ image_url | relative_url }}" alt="{{ post.title | escape }}" class="thumb-img">
                      </div>
                    {% else %}
                      <div class="devlog-placeholder">
                        <span class="glyphicon glyphicon-file-text"></span>
                      </div>
                    {% endif %}
                    <a href="{{ post.url | relative_url }}" class="btn btn-primary btn-sm devlog-btn">
                      <span class="glyphicon glyphicon-arrow-right"></span>
                      Read Post
                    </a>
                  </div>
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
        <span class="glyphicon glyphicon-file-text" style="font-size: 64px; color: #ccc;"></span>
        <h3>No Devlog Posts Yet</h3>
        <p class="text-muted">Check back soon for development updates and technical insights!</p>
      </div>
    </div>
    {% endif %}
    
    <!-- No Search Results -->
    <div id="no-results" class="no-results hidden">
      <div class="text-center">
        <span class="glyphicon glyphicon-search" style="font-size: 48px; color: #ccc;"></span>
        <h3>No posts found</h3>
        <p class="text-muted">Try different search terms or browse all devlog posts.</p>
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
  max-width: 600px;
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
  background: #e3f2fd;
  border-radius: 4px;
  border-left: 4px solid #2196f3;
}

/* Devlog List */
.devlog-list {
  margin-bottom: 40px;
}

#all-posts {
  display: block;
}

.devlog-item {
  margin-bottom: 30px;
  transition: transform 0.2s ease;
}

.devlog-item:hover {
  transform: translateX(5px);
}

.devlog-card {
  background: white;
  border: 1px solid #e9ecef;
  border-left: 4px solid #667eea;
  border-radius: 8px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
}

.devlog-card:hover {
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
  border-left-color: #764ba2;
}

.devlog-card::before {
  content: '⚙️';
  position: absolute;
  top: 20px;
  left: -12px;
  width: 20px;
  height: 20px;
  font-size: 14px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #667eea;
  transition: border-color 0.3s ease;
}

.devlog-card:hover::before {
  border-color: #764ba2;
}

.devlog-content {
  padding-right: 20px;
}

.devlog-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  color: #6c757d;
  font-size: 14px;
}

.devlog-meta .glyphicon {
  margin-right: 4px;
}

.devlog-date {
  font-weight: 600;
}

.reading-time {
  opacity: 0.8;
}

.featured-badge {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.devlog-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.4;
}

.devlog-title a {
  color: #212529;
  text-decoration: none;
  transition: color 0.2s ease;
}

.devlog-title a:hover {
  color: #667eea;
  text-decoration: none;
}

.devlog-excerpt {
  color: #6c757d;
  line-height: 1.6;
  font-size: 15px;
  margin-bottom: 16px;
}

.devlog-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.devlog-tags .glyphicon {
  color: #667eea;
  margin-right: 4px;
}

.tag {
  background: #f1f3fb;
  color: #4c63d2;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid #e1e8ed;
}

.devlog-actions {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.devlog-thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #f1f3f4;
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.devlog-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background: #f8f9fa;
  border: 2px dashed #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 24px;
}

.devlog-btn {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.devlog-btn:hover {
  background: linear-gradient(45deg, #5a67d8, #6b46a3);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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
  
  .devlog-card {
    padding: 20px;
  }
  
  .devlog-content {
    padding-right: 0;
    margin-bottom: 20px;
  }
  
  .devlog-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .devlog-actions {
    flex-direction: row;
    justify-content: space-between;
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
  
  .devlog-item:hover {
    transform: none;
  }
  
  .devlog-card {
    padding: 16px;
  }
  
  .devlog-title {
    font-size: 18px;
  }
  
  .devlog-actions {
    flex-direction: column;
  }
}
</style>

<script>
let currentPage = 1;
const postsPerPage = 15;
let allPosts = [];
let filteredPosts = [];

document.addEventListener('DOMContentLoaded', function() {
  allPosts = Array.from(document.querySelectorAll('.devlog-item'));
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
  
  searchCount.textContent = `Found ${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''} matching "${document.getElementById('search-input').value}"`;
  searchInfo.classList.remove('hidden');
  
  if (filteredPosts.length === 0) {
    noResults.classList.remove('hidden');
    document.getElementById('all-posts').style.display = 'none';
  } else {
    noResults.classList.add('hidden');
    document.getElementById('all-posts').style.display = 'block';
  }
  
  currentPage = 1;
  showPage(1);
  setupPagination();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('search-info').classList.add('hidden');
  document.getElementById('no-results').classList.add('hidden');
  document.getElementById('all-posts').style.display = 'block';
  
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
    paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalPosts} posts`;
  }
}

// Search on Enter key
document.getElementById('search-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchPosts();
  }
});
</script>