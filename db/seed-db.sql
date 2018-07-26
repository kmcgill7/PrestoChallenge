INSERT INTO presto.restaurant (name) VALUES
  ('foo');

--primary items
INSERT INTO presto.item (restaurant_id, name, price) VALUES
  (1, 'combo', 1299),
  (1, 'lunch_special', 999),
  (1, 'pie', 699),
  (1, 'drink', 299);

--secondary items (modifiers)
INSERT INTO presto.item (restaurant_id, name, price) VALUES
  (1, 'side_salad', 299),
  (1, 'ice_cream', 100),
  (1, 'ranch_dressing', 50),
  (1, 'balsamic_dressing', 50);

-- modifier mapping
INSERT INTO presto.modification (source_id, target_id) VALUES
  (5, 1),
  (5, 2),
  (6, 3),
  (7, 5),
  (8, 5);
