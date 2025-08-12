package com.example.posting_service.bookmarks.service;

import com.example.posting_service.bookmarks.entity.BookmarkEntity;

import java.util.List;

public interface BookmarkService {

    BookmarkEntity addBookmark(BookmarkEntity bookmarkEntity);

    String removeBookmark(int bookmarkedByUserId, Long bookmarkedPostId);

    List<BookmarkEntity> getAllBookmarksDescendingOrder(int userId);

    List<BookmarkEntity> findAllByBookmarkedPostId(Long postId);
}
