CREATE function public.create_public_user() returns trigger as $$ begin
INSERT INTO public.users (
        user_id,
        preferred_title,
        alma_mater,
        current_tenure,
        photo_url
    )
VALUES (
        NEW.id,
        'Honourable',
        'unknown',
        'unknown',
        'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    ) ON CONFLICT (user_id) DO NOTHING;
RETURN NEW;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.create_user();


CREATE function public.create_public_user() returns trigger as $$ begin
INSERT INTO public.users (
        user_id,
        name,
        preferred_title,
        alma_mater,
        current_tenure,
        photo_url
    )
VALUES (
        NEW.id,
        'unkown',
        'Honourable',
        'unknown',
        'unknown',
        'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    ) ON CONFLICT (user_id) DO NOTHING;
RETURN NEW;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
after
insert on auth.users for each row execute procedure public.create_user();