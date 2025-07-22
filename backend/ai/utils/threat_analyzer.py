# utils/threat_analyzer.py or similar

def detect_and_store_threats():
    preprocess_network_data()
    threats = detect_threats()
    new_threats = []

    if threats:
        collect_system_logs("Threats detected: {}".format(len(threats)), "WARNING")

        for threat in threats:
            unique_str = f"{threat.get('source_ip', '')}_{threat.get('destination_ip', '')}_{threat.get('timestamp', '')}_{threat.get('threat', '')}_{threat.get('data', '')}"
            threat_hash = hashlib.sha256(unique_str.encode()).hexdigest()

            if not mongo_db["threat_logs"].find_one({"hash": threat_hash}):
                threat_record = {
                    "threat": threat["threat"],
                    "source_ip": threat.get("source_ip", ""),
                    "destination_ip": threat.get("destination_ip", ""),
                    "timestamp": datetime.utcnow(),
                    "data": threat.get("data", ""),
                    "hash": threat_hash
                }
                mongo_db["threat_logs"].insert_one(threat_record)
                new_threats.append(threat_record)

        if new_threats:
            send_threat_alert_to_admin(new_threats)
    else:
        collect_system_logs("No threats detected during analysis", "INFO")
