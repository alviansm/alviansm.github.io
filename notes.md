---
layout: page
title: Notes
permalink: /notes/
---

<div class="category-archive-page">
  <!-- Category Header -->
  <div class="category-header">
    <div class="row">
      <div class="col-md-8 col-md-offset-2 text-center">
        <div class="category-icon">
          <span class="glyphicon glyphicon-edit"></span>
        </div>
        <h1 class="category-title">Quick Notes</h1>
        <p class="category-description">
          Random thoughts, quick insights, and small discoveries worth remembering.
          A collection of bite-sized knowledge and spontaneous observations.
        </p>
        <div class="category-stats">
          {% assign notes_posts = site.posts | where_exp: "post", "post.categories contains 'Notes'" %}
          <span class="stat-item">
            <strong>{{ notes_posts.size }}</strong> note{% if notes_posts.size != 1 %}s{% endif %}
          </span>
          {% if notes_posts.size > 0 %}
          <span class="stat-divider">•</span>
          <span class="stat-item">
            Latest: {{ notes_posts.first.date | date: "%B %Y" }}
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
          <input type="text" id="search-input" class="form-control" placeholder="Search notes...">
          <span class="input-group-btn">
            <button class="btn btn-success" type="button" onclick="searchPosts()">
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
    {% if notes_posts.size > 0 %}
    <div class="posts-list">
      <div id="all-posts">
        {% for post in notes_posts %}
          <div class="note-item" 
               data-title="{{ post.title | downcase }}" 
               data-content="{{ post.content | strip_html | downcase }}"
               data-tags="{% for tag in post.tags %}{{ tag | downcase }} {% endfor %}"
               data-date="{{ post.date | date: '%Y-%m-%d' }}">
            
            <article class="note-card">
              <div class="note-header">
                <div class="note-meta">
                  <span class="note-date">{{ post.date | date: "%b %d, %Y" }}</span>
                  <span class="note-time">{{ post.date | date: "%l:%M %p" }}</span>
                </div>
                {% if post.tags.size > 0 %}
                  <div class="note-tags">
                    {% for tag in post.tags limit: 4 %}
                      <span class="tag">{{ tag }}</span>
                    {% endfor %}
                  </div>
                {% endif %}
              </div>
              
              <div class="note-content">
                <h3 class="note-title">
                  <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                </h3>
                
                {% if post.excerpt %}
                <div class="note-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</div>
                {% endif %}
              </div>
              
              <div class="note-footer">
                <a href="{{ post.url | relative_url }}" class="note-link">
                  Read full note <span class="glyphicon glyphicon-arrow-right"></span>
                </a>
                {% if post.featured %}
                  <span class="featured-note">📌 Pinned</span>
                {% endif %}
              </div>
            </article>
          </div>
        {% endfor %}
      </div>
    </div>
    {% else %}
    <div class="empty-category">
      <div class="text-center">
        <span class="glyphicon glyphicon-pencil" style="font-size: 64px; color: #ccc;"></span>
        <h3>No Notes Yet</h3>
        <p class="text-muted">This is where quick thoughts and insights will appear!</p>
      </div>
    </div>
    {% endif %}
    
    <!-- No Search Results -->
    <div id="no-results" class="no-results hidden">
      <div class="text-center">
        <span class="glyphicon glyphicon-search" style="font-size: 48px; color: #ccc;"></span>
        <h3>No notes found</h3>
        <p class="text-muted">Try different search terms or browse all notes.</p>
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
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
  background: #e8f5e8;
  border-radius: 4px;
  border-left: 4px solid #28a745;
}

/* Notes List */
.posts-list {
  margin-bottom: 40px;
}

#all-posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.note-item {
  transition: transform 0.2s ease;
}

.note-item:hover {
  transform: translateX(8px);
}

.note-card {
  background: white;
  border: 1px solid #e9ecef;
  border-left: 4px solid #28a745;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.note-card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  border-left-color: #11998e;
}

.note-card::before {
  content: '';
  position: absolute;
  top: 12px;
  left: -6px;
  width: 8px;
  height: 8px;
  background: #28a745;
  border-radius: 50%;
  border: 2px solid white;
  transition: background-color 0.3s ease;
}

.note-card:hover::before {
  background: #11998e;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.note-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6c757d;
  font-size: 14px;
}

.note-date {
  font-weight: 600;
}

.note-time {
  opacity: 0.8;
  font-size: 13px;
}

.note-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  background: #e8f5e8;
  color: #155724;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.note-content {
  margin-bottom: 16px;
}

.note-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
}

.note-title a {
  color: #212529;
  text-decoration: none;
  transition: color 0.2s ease;
}

.note-title a:hover {
  color: #11998e;
  text-decoration: none;
}

.note-excerpt {
  color: #6c757d;
  line-height: 1.6;
  font-size: 15px;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: