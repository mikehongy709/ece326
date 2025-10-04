import pytest
from crawler import crawler 

def test_doc_id_unique():
    c = crawler(None, "url.txt")
    id1 = c.document_id("http://google.ca")
    id2 = c.document_id("http://google.ca")
    id3 = c.document_id("http://bing.com") 
    assert id1 == id2
    assert id1 != id3


def test_word_id_unique():
    c = crawler(None, "url.txt")
    id1 = c.word_id("google")
    id2 = c.word_id("google")
    id3 = c.word_id("search")
    assert id1 == id2
    assert id1 != id3

def test_doc_id_increase():
    c = crawler(None, "url.txt")
    urls = ["http://google.ca", "http://google.com", "http://bing.com"]
    for url in urls:
        doc_id = c.document_id(url)
        
    for i in range(len(urls)):
        assert urls[i] in c._doc_id_cache
        assert c._doc_id_cache[urls[i]] == i + 1

def test_word_id_increase():
    c = crawler(None, "url.txt")
    words = ["google", "search", "engine", "bing"]
    for word in words:
        word_id = c.word_id(word)
    
    for i in range(len(words)):
        assert words[i] in c._word_id_cache
        assert c._word_id_cache[words[i]] == i + 1

def test_forward_and_inverted_index():
    c = crawler(None, "url.txt")
    url = "http://google.ca"
    doc_id = c.document_id(url)
    c._curr_url = url
    c._curr_doc_id = doc_id
    google = "google"
    search = "search"
    c._curr_words = [(c.word_id(google), 1), (c.word_id(search), 1)]
    c._add_words_to_document()
    c._process_idx(google)
    c._process_idx(search)

    assert doc_id in c._doc_id_words_id_forward_idx
    assert c.word_id(google) in c._doc_id_words_id_forward_idx[doc_id]

    word_id = c.word_id(google)
    assert doc_id in c._words_id_doc_id_invert_idx[word_id]


def test_resolved_inverted_index():
    c = crawler(None, "url.txt")
    url = "http://google.ca"
    d1 = c.document_id(url)
    c._curr_url = url
    c._curr_doc_id = d1
    google = "google"
    search = "search"
    c._curr_words = [(c.word_id(google), 1), (c.word_id(search), 1)]
    c._add_words_to_document()
    c._process_idx(google)
    c._process_idx(search)

    url = "http://bing.com"
    d2 = c.document_id(url)
    c._curr_url = url
    c._curr_doc_id = d2
    engine = "engine"
    c._curr_words = [(c.word_id(search), 1), (c.word_id(engine), 1)]
    c._add_words_to_document()
    c._process_idx(search)
    c._process_idx(engine)

    resolved = c.get_resolved_inverted_idx()    
    assert "google" in resolved
    assert "http://google.ca" in resolved["google"]
    assert "search" in resolved
    assert "http://google.ca" in resolved["search"]
    assert "http://bing.com" in resolved["search"]


def test_ignore_tags_and_stopwords():
    c = crawler(None, "url.txt")
    doc_id = c.document_id("http://example.com")
    c._curr_url = "http://example.com"
    c._curr_doc_id = doc_id
    c._curr_words = [(c.word_id("google"), 1), (c.word_id("the"), 1)]
    c._add_words_to_document()
    c._process_idx("google")
    c._process_idx("the")
    word_id_google = c.word_id("google")
    assert word_id_google in c._words_id_doc_id_invert_idx
    assert doc_id in c._words_id_doc_id_invert_idx[word_id_google]
