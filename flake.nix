{
  description = "Development Flake for building cimolini.com.";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  inputs.systems.url = "github:nix-systems/default";
  inputs.flake-utils = {
    url = "github:numtide/flake-utils";
    inputs.systems.follows = "systems";
  };
  inputs.wrangler.url = "github:emrldnix/wrangler";

  outputs =
    {
      nixpkgs,
      flake-utils,
      wrangler,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            bashInteractive
            nodejs
            jq
            wrangler.packages.${system}.wrangler
          ];
          shellHook = ''
            # Dynamically add the local node_modules/.bin directory to your PATH
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';
        };
      }
    );
}
