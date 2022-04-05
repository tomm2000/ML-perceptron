# COMPILE
## compilte to wasm
### -first time only
```
rustup target add wasm32-unknown-unknown
```
```
cargo install wasm-gc
```
### -every time to compile
```
cargo build --target wasm32-unknown-unknown --release
```
## compilte to native
```
cargo build
```