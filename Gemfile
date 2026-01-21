source "https://rubygems.org"

gem "jekyll", "~> 3.10.0"

# Required for Ruby 3.4+ compatibility
gem "base64"
gem "logger"
gem "bigdecimal"
gem "kramdown-parser-gfm"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-paginate"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
# Note: wdm has compatibility issues with Ruby 3.4, so we're using a more compatible version
# or removing it entirely if it causes issues
platforms :mingw, :x64_mingw, :mswin do
  if RUBY_VERSION < "3.1"
    gem "wdm", "~> 0.1.1"
  end
end