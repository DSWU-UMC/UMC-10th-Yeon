-- 1. 내가 진행중, 진행 완료한 미션 모아서 보는 쿼리(페이징 포함)

-- offset
SELECT mr.id, mr.status, mr.created_at,
       m.name, m.mission_spec, m.reward_points,
       r.name AS restaurant_name
FROM mission_record mr
JOIN mission m ON mr.mission_id = m.id
JOIN restaurant r ON m.restaurant_id = r.id
WHERE mr.user_id = :userId
  AND mr.status = :status  
ORDER BY mr.created_at DESC
LIMIT :limit OFFSET :offset;

-- cursor
SELECT mr.id, mr.status, mr.created_at,
       m.name, m.mission_spec, m.reward_points,
       r.name AS restaurant_name
FROM mission_record mr
JOIN mission m ON mr.mission_id = m.id
JOIN restaurant r ON m.restaurant_id = r.id
WHERE mr.user_id = :userId
  AND mr.status = :status
  AND (:cursorId IS NULL OR mr.id < :cursorId)
ORDER BY mr.id DESC
LIMIT :limit;

-- 2. 리뷰 작성하는 쿼리, 사진의 경우는 일단 배제
INSERT INTO review (user_id, mission_record_id, body, score, created_at)
SELECT :userId, :missionRecordId, :body, :score, NOW()
FROM mission_record
WHERE id = :missionRecordId
  AND user_id = :userId
  AND status = 'COMPLETED';

-- 3. 홈 화면 쿼리 (현재 선택 된 지역에서 도전이 가능한 미션 목록, 페이징 포함)
SELECT m.id, m.name, m.mission_spec, m.reward_points,
       r.name AS restaurant_name, r.category
FROM mission m
JOIN restaurant r ON m.restaurant_id = r.id
JOIN region rg ON r.region_id = rg.id
WHERE rg.id = :regionId
  AND NOT EXISTS (
    SELECT 1
    FROM mission_record mr
    WHERE mr.user_id = :userId
      AND mr.mission_id = m.id
      AND mr.status = 'COMPLETED'
  )
ORDER BY m.id ASC
LIMIT :limit OFFSET :offset;

-- 4. 마이 페이지 화면 쿼리
SELECT u.nickname, u.email, u.phone_num, u.point
FROM users u
WHERE u.id = :userId;