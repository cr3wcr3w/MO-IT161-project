-- Create the function, or update it if it already exists.
CREATE OR REPLACE FUNCTION auth.assign_default_role()
-- Tell PostgreSQL that this function is intended for a trigger.
RETURNS TRIGGER
-- Use PostgreSQL's procedural language, which supports variables and IF statements.
LANGUAGE plpgsql
-- Begin the function body.
AS $$
-- Declare variables used by the function.
DECLARE
    -- Store the UUID of the default guest role.
    guest_role_id UUID;

-- Begin the executable logic of the function.
BEGIN
    -- Find the ID of the role named "guest".
    SELECT id
    -- Store the query result in the guest_role_id variable.
    INTO guest_role_id
    -- Read the available roles from the auth schema.
    FROM auth.roles
    -- Select only the guest role.
    WHERE role = 'guest';
    -- Check whether the guest role was found.
    IF guest_role_id IS NULL THEN
        -- Stop execution if the required default role does not exist.
        RAISE EXCEPTION 'Default role "guest" does not exist';
    -- End the IF condition.
    END IF;
    -- Insert a role assignment into the user-role junction table.
    INSERT INTO auth.user_roles (user_id, role_id)
    -- Use the newly inserted user's ID and the guest role's UUID.
    VALUES (NEW.id, guest_role_id)
    -- If this user already has a role, do not create another assignment.
    -- This relies on a UNIQUE constraint on user_roles.user_id.
    ON CONFLICT (user_id) DO NOTHING;
    -- Return the newly inserted user row to complete the trigger function.
    RETURN NEW;
-- End the function's executable logic.
END;
-- Mark the end of the function body.
$$;


-- Remove the existing trigger if it is already installed on this table.
DROP TRIGGER IF EXISTS trg_user_assign_default_role
ON auth."user";


-- Create the trigger that automatically assigns the default role.
CREATE TRIGGER trg_user_assign_default_role
-- Run the trigger after a user has been inserted successfully.
AFTER INSERT ON auth."user"
-- Execute the trigger once for every newly inserted user row.
FOR EACH ROW
-- Call the function defined above whenever the trigger fires.
EXECUTE FUNCTION auth.assign_default_role();

