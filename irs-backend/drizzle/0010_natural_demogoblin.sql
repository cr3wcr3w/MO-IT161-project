-- Custom SQL migration file, put your code below! --

-- Create the function that initializes onboarding progress.
CREATE OR REPLACE FUNCTION onboarding.initialize_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    first_step_id INTEGER;
BEGIN
    -- Find the first onboarding step by its order.
    SELECT id
    INTO first_step_id
    FROM onboarding.steps
    ORDER BY "order" ASC
    LIMIT 1;

    -- Require at least one onboarding step to exist.
    IF first_step_id IS NULL THEN
        RAISE EXCEPTION 'No onboarding steps have been configured';
    END IF;

    -- Initialize progress for the newly created user.
    INSERT INTO onboarding.progress (
        user_id,
        current_step_id
    )
    VALUES (
        NEW.id,
        first_step_id
    )
    ON CONFLICT (user_id) DO NOTHING;

    -- Return the newly created user.
    RETURN NEW;
END;
$$;


-- Remove the trigger if it already exists.
DROP TRIGGER IF EXISTS trg_user_initialize_onboarding
ON auth."user";


-- Initialize onboarding after a user is created.
CREATE TRIGGER trg_user_initialize_onboarding
AFTER INSERT ON auth."user"
FOR EACH ROW
EXECUTE FUNCTION onboarding.initialize_progress();