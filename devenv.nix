{ pkgs, ... }:

{
  stdenv = pkgs.stdenvNoCC;
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_24;
    pnpm = {
      enable = true;
      package = pkgs.pnpm_12;
      install.enable = true;
    };
  };

  tasks = {
    "pnpm:install" = {
      exec = "pnpm install";
    };
  };

  profiles = {
    web.module = {
      processes = {
        web = {
          exec = "pnpm --filter web dev";
          after = [ "pnpm:install" ];
        };
      };

    };
    storybook.module = {
      processes = {
        storybook = {
          exec = "pnpm --filter storybook dev";
          after = [ "pnpm:install" ];
        };
      };
    };
  };
}
