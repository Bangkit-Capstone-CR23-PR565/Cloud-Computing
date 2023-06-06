CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `category` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `image_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stand_available` int(3) DEFAULT NULL,
  `price_per_stand` int(11) DEFAULT NULL,
  `like_count` int(11) DEFAULT NULL,
  `location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `user_rating` int(2) DEFAULT NULL,
  `user_comment` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `recommendation_result` (
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `category_interest` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_likes` (
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

ALTER TABLE `recommendation_result`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`(30));

ALTER TABLE `user_likes`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=401;

ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `recommendation_result`
  ADD CONSTRAINT `recommendation_result_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `recommendation_result_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `user_likes`
  ADD CONSTRAINT `user_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_likes_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);
COMMIT;