install-packages:
	pip install -r requirements.txt
run-server:
	cd src/llm_server && uvicorn main:app --reload