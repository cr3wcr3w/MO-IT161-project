Let's use a simple `users` and `posts` example to understand `onDelete` in Drizzle ORM.

## 1. The relationship

A user can create many posts, but each post belongs to one user.

`users` — Parent

`id` (Primary Key)

One user → many posts

`posts` — Child

`id` (PK), `user_id` (FK), `content`

## 2. Example Drizzle schema

```
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
});
```

Notice this line:

```
.references(() => users.id, { onDelete: "cascade" })
```

It means that if a user is physically deleted, PostgreSQL automatically deletes that user's posts.

## 3. What happens with each `onDelete` option?

Suppose your tables contain these records:

`users`

| id   | name  |
| ---- | ----- |
| `U1` | Alex  |
| `U2` | Jamie |

`posts`

| id   | user_id | content       |
| ---- | ------- | ------------- |
| `P1` | `U1`    | Hello world   |
| `P2` | `U1`    | My first post |
| `P3` | `U2`    | Good morning  |

Now, imagine deleting Alex (`U1`).

### `onDelete: "cascade"`

Alex is deleted. Posts `P1` and `P2` are also deleted automatically. Jamie and `P3` remain.

### `onDelete: "restrict"`

Deletion fails because Alex still has posts. You must delete those posts first or handle the relationship another way.

### `onDelete: "set null"`

Alex is deleted, but `P1` and `P2` remain with `user_id = NULL`. The `userId` column must allow `NULL` for this to work.

### `onDelete: "no action"`

PostgreSQL normally rejects deleting Alex while posts still reference `U1`, because that would violate the foreign key constraint.