---
layout: page
title: Essays
permalink: /essay/
---

<div class="category-archive-page">
  <!-- Category Header -->
  <div class="category-header">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <div class="category-icon">
          <span class="glyphicon glyphicon-book"></span>
        </div>
        <h1 class="category-title">Essays & Long-form</h1>
        <p class="category-description">
          In-depth explorations, thoughtful analyses, and comprehensive discussions on topics that matter.
          Deep dives into ideas, experiences, and perspectives that deserve more than just a quick note.
        </p>
        <div class="category-stats">
          {% assign essay_posts = site.posts | where_exp: "post", "post.categories contains 'Essay'" %}
          <span class="stat-item">
            <strong>{{ essay_posts.size }}</strong> essay{% if essay_posts.size != 1 %}s{% endif %}
          </span>
          {% if essay_posts.size > 0 %}
          <span class="stat-divider">•</span>
          <span class="stat-item">
            Latest: {{ essay_posts.first.date | date: "%B %Y" }}
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
          <input type="text" id="search-input" class="form-control" placeholder="Search essays...">
          <span class="input-group-btn">
            <button class="btn btn-warning" type="button" onclick="searchPosts()">
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
    {% if essay_posts.size > 0 %}
    <div class="essays-list">
      <div id="all-posts">
        {% for post in essay_posts %}
          <div class="essay-item" 
               data-title="{{ post.title | downcase }}" 
               data-content="{{ post.content | strip_html | downcase }}"
               data-tags="{% for tag in post.tags %}{{ tag | downcase }} {% endfor %}"
               data-date="{{ post.date | date: '%Y-%m-%d' }}">
            
            <article class="essay-card">
              {% if post.image %}
              <div class="essay-image">
                <img src="{{ post.image | relative_url }}" alt="{{ post.title }}" class="essay-img">
                <div class="essay-overlay">
                  {% if post.featured %}
                    <span class="featured-badge">Featured Essay</span>
                  {% endif %}
                </div>
              </div>
              {% endif %}
              
              <div class="essay-content">
                <div class="essay-meta">
                  <div class="meta-left">
                    <span class="essay-date">{{ post.date | date: "%B %d, %Y" }}</span>
                    {% assign word_count = post.content | strip_html | number_of_words %}
                    {% assign reading_time = word_count | divided_by: 200 | plus: 1 %}
                    <span class="reading-time">{{ reading_time }} min read</span>
                  </div>
                  
                  {% if post.tags.size > 0 %}
                    <div class="essay-tags">
                      {% for tag in post.tags limit: 3 %}
                        <span class="tag">{{ tag }}</span>
                      {% endfor %}
                    </div>
                  {% endif %}
                </div>
                
                <h2 class="essay-title">
                  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </h2>
                
                {% if post.excerpt %}
                <div class="essay-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</div>
                {% endif %}
                
                <div class="essay-footer">
                  <a href="{{ post.url | relative_url }}" class="read-essay-btn">
                    <span class="btn-text">Read Full Essay</span>
                    <span class="glyphicon glyphicon-arrow-right"></span>
                  </a>
                  
                  {% if post.author %}
                    <div class="essay-author">
                      <span class="glyphicon glyphicon-user"></span>
                      {{ post.author }}
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
        <span class="glyphicon glyphicon-file-text" style="font-size: 64px; color: #ccc;"></span>
        <h3>No Essays Yet</h3>
        <p class="text-muted">Long-form content and thoughtful essays will appear here!</p>
      </div>
    </div>
    {% endif %}
    
    <!-- No Search Results -->
    <div id="no-results" class="no-results hidden">
      <div class="text-center">
        <span class="glyphicon glyphicon-search" style="font-size: 48px; color: #ccc;"></span>
        <h3>No essays found</h3>
        <p class="text-muted">Try different search terms or browse all essays.</p>
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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
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
  background: #fff3cd;
  border-radius: 4px;
  border-left: 4px solid #ffc107;
}

/* Essays List */
.essays-list {
  margin-bottom: 40px;
}

#all-posts {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.essay-item {
  transition: transform 0.3s ease;
}

.essay-item:hover {
  transform: translateY(-4px);
}

.essay-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 1px solid #f1f3f4;
}

.essay-card:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  border-color: #f5576c;
}

.essay-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.essay-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.essay-card:hover .essay-img {
  transform: scale(1.08);
}

.essay-overlay {
  position: absolute;
  top: 16px;
  right: 16px;
}

.featured-badge {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(245, 87, 108, 0.3);
}

.essay-content {
  padding: 32px;
}

.essay-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.meta-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.essay-date {
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
}

.reading-time {
  color: #adb5bd;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.reading-time::before {
  content: '⏱️';
  font-size: 12px;
}

.essay-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  background: linear-gradient(45deg, #fff1f3, #fce7f3);
  color: #be185d;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #f9a8d4;
}

.essay-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.3;
  color: #1a202c;
}

.essay-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.essay-title a:hover {
  color: #f5576c;
  text-decoration: none;
}

.essay-excerpt {
  color: #4a5568;
  line-height: 1.7;
  font-size: 16px;
  margin-bottom: 24px;
}

.essay-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #f1f3f4;
}

.read-essay-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(45deg, #f093fb, #f5576c);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.3);
}

.read-essay-btn:hover {
  color: white;
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);
}

.essay-author {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
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
  color: #f5576c;
  border-color: #dee2e6;
}

.pagination > li > a:hover {
  color: #e73c7e;
  background-color: #f8f9fa;
}

.pagination > .active > a {
  background-color: #f5576c;
  border-color: #f5576c;
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
  
  .essay-content {
    padding: 24px;
  }
  
  .essay-title {
    font-size: 22px;
  }
  
  .essay-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .essay-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .essay-image {
    height: 200px;
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
  
  .essay-content {
    padding: 20px;
  }
  
  .essay-title {
    font-size: 20px;
  }
  
  .essay-excerpt {
    font-size: 15px;
  }
  
  .essay-image {
    height: 180px;
  }
}
</style>

<script>
let currentPage = 1;
const postsPerPage = 8;
let allPosts = [];
let filteredPosts = [];

document.addEventListener('DOMContentLoaded', function() {
  allPosts = Array.from(document.querySelectorAll('.essay-item'));
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
  
  searchCount.textContent = `Found ${filteredPosts.length} essay${filteredPosts.length !== 1 ? 's' : ''} matching "${document.getElementById('search-input').value}"`;
  searchInfo.classList.remove('hidden');
  
  if (filteredPosts.length === 0) {
    noResults.classList.remove('hidden');
    document.getElementById('all-posts').style.display = 'none';
  } else {
    noResults.classList.add('hidden');
    document.getElementById('all-posts').style.display = 'flex';
  }
  
  currentPage = 1;
  showPage(1);
  setupPagination();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  document.getElementById('search-info').classList.add('hidden');
  document.getElementById('no-results').classList.add('hidden');
  document.getElementById('all-posts').style.display = 'flex';
  
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
  
function updatePaginationInfo() {
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage + 1;
  const endIndex = Math.min(currentPage * postsPerPage, totalPosts);
  
  const paginationInfo = document.getElementById('pagination-info');
  
  if (totalPosts === 0) {
    paginationInfo.textContent = '';
  } else {
    paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalPosts} essays`;
  }
}

// Search on Enter key
document.getElementById('search-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchPosts();
  }
});
</script>